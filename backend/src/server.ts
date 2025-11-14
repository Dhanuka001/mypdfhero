import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILES_PER_REQUEST = 10;

class HttpError extends Error {
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(statusCode: number, message: string, details?: Record<string, unknown>) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler =
  (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES_PER_REQUEST,
  },
});

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  }),
);
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const pdfRouter = express.Router();

pdfRouter.post(
  "/compress",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new HttpError(400, "A PDF file is required under the `file` field.");
    }

    validatePdf(req.file);
    const compressed = await compressPdfBuffer(req.file.buffer);
    const originalSize = req.file.size;
    const compressedSize = compressed.length;
    const reductionPercent =
      originalSize > 0 ? Number(((1 - compressedSize / originalSize) * 100).toFixed(2)) : 0;

    res
      .setHeader("Content-Type", "application/pdf")
      .setHeader("Content-Disposition", `attachment; filename="compressed-${Date.now()}.pdf"`)
      .setHeader(
        "X-PDF-Stats",
        JSON.stringify({
          originalSize,
          compressedSize,
          reductionPercent,
        }),
      )
      .send(compressed);
  }),
);

pdfRouter.post(
  "/merge",
  upload.array("files"),
  asyncHandler(async (req, res) => {
    const files = ensureFiles(req.files);
    if (files.length < 2) {
      throw new HttpError(400, "Please upload at least two PDF files using the `files` field.");
    }
    files.forEach(validatePdf);

    const merged = await mergePdfFiles(files);
    res
      .setHeader("Content-Type", "application/pdf")
      .setHeader("Content-Disposition", `attachment; filename="merged-${Date.now()}.pdf"`)
      .send(merged);
  }),
);

pdfRouter.post(
  "/jpg-to-pdf",
  upload.array("images"),
  asyncHandler(async (req, res) => {
    const files = ensureFiles(req.files);
    if (files.length === 0) {
      throw new HttpError(400, "Please upload JPG or PNG files under the `images` field.");
    }
    files.forEach(validateImage);

    const pdfBuffer = await convertImagesToPdf(files);
    res
      .setHeader("Content-Type", "application/pdf")
      .setHeader("Content-Disposition", `attachment; filename="images-${Date.now()}.pdf"`)
      .send(pdfBuffer);
  }),
);

app.use("/api/pdf", pdfRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File too large. Each file must be under 20MB." });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message, ...(err.details && { details: err.details }) });
  }

  console.error(err);
  return res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`MyPDFHero API running on http://localhost:${PORT}`);
});

type MulterFilesInput =
  | Express.Multer.File[]
  | Record<string, Express.Multer.File[]>
  | Express.Multer.File
  | undefined;

function isSingleMulterFile(value: MulterFilesInput): value is Express.Multer.File {
  return Boolean(value && typeof (value as Express.Multer.File).fieldname === "string");
}

function ensureFiles(files: MulterFilesInput): Express.Multer.File[] {
  if (!files) {
    return [];
  }
  if (Array.isArray(files)) {
    return files;
  }
  if (isSingleMulterFile(files)) {
    return [files];
  }
  return Object.values(files).flat();
}

function validatePdf(file: Express.Multer.File) {
  if (!file.mimetype.includes("pdf")) {
    throw new HttpError(400, `File ${file.originalname} is not a valid PDF.`);
  }
}

const allowedImageTypes = new Set(["image/jpeg", "image/png"]);

function validateImage(file: Express.Multer.File) {
  if (!allowedImageTypes.has(file.mimetype)) {
    throw new HttpError(400, `File ${file.originalname} must be a JPG or PNG image.`);
  }
}

async function compressPdfBuffer(buffer: Buffer) {
  const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  const resultDoc = await PDFDocument.create();
  const copiedPages = await resultDoc.copyPages(sourceDoc, sourceDoc.getPageIndices());
  copiedPages.forEach((page) => resultDoc.addPage(page));
  resultDoc.setProducer("MyPDFHero");
  resultDoc.setCreator("MyPDFHero Compressor");
  return resultDoc.save({ useObjectStreams: true });
}

async function mergePdfFiles(files: Express.Multer.File[]) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const doc = await PDFDocument.load(file.buffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  mergedPdf.setProducer("MyPDFHero");
  mergedPdf.setCreator("MyPDFHero Merge");
  return mergedPdf.save({ useObjectStreams: true });
}

const PX_TO_PT = 72 / 96;

async function convertImagesToPdf(files: Express.Multer.File[]) {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const processor = sharp(file.buffer, { failOn: "none" }).rotate();
    const metadata = await processor.metadata();
    const widthPx = metadata.width ?? 1024;
    const heightPx = metadata.height ?? 768;
    const pageWidth = Math.max(100, widthPx * PX_TO_PT);
    const pageHeight = Math.max(100, heightPx * PX_TO_PT);
    const jpegBuffer = await processor.jpeg({ quality: 82 }).toBuffer();
    const embedded = await pdfDoc.embedJpg(jpegBuffer);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(embedded, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    });
  }

  pdfDoc.setProducer("MyPDFHero");
  pdfDoc.setCreator("MyPDFHero JPG to PDF");
  return pdfDoc.save({ useObjectStreams: true });
}
