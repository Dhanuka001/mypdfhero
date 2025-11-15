import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

/**
 * Basic configuration
 */
const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILES_PER_REQUEST = 10;
const GHOSTSCRIPT_BINARY = process.env.GHOSTSCRIPT_PATH || (process.platform === "win32" ? "gswin64c" : "gs");
const GHOSTSCRIPT_INSTALL_HELP =
  "Install Ghostscript (macOS: `brew install ghostscript`, Debian/Ubuntu: `sudo apt-get install ghostscript`, RHEL/CentOS: `sudo yum install ghostscript`) or set GHOSTSCRIPT_PATH.";
const GHOSTSCRIPT_PRESETS: { name: string; args: string[] }[] = [
  { name: "screen", args: ["-dPDFSETTINGS=/screen"] },
  { name: "ebook", args: ["-dPDFSETTINGS=/ebook"] },
  {
    name: "aggressive",
    args: [
      "-dPDFSETTINGS=/screen",
      "-dDetectDuplicateImages=true",
      "-dDownsampleColorImages=true",
      "-dDownsampleGrayImages=true",
      "-dDownsampleMonoImages=true",
      "-dColorImageDownsampleType=/Bicubic",
      "-dGrayImageDownsampleType=/Bicubic",
      "-dMonoImageDownsampleType=/Subsample",
      "-dColorImageResolution=72",
      "-dGrayImageResolution=72",
      "-dMonoImageResolution=144",
    ],
  },
];

/**
 * Custom HTTP error type for structured error responses
 */
class HttpError extends Error {
  statusCode: number;
  details?: Record<string, unknown>;

  constructor(statusCode: number, message: string, details?: Record<string, unknown>) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Async handler wrapper so we don't repeat try/catch everywhere
 */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler =
  (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch(next);

/**
 * Multer configuration (in-memory storage, size limits)
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES_PER_REQUEST,
  },
});

/**
 * Express app setup
 */
const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  }),
);
app.use((_req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-PDF-Stats,Content-Disposition");
  next();
});
app.use(express.json());

/**
 * Health check endpoint
 */
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * PDF router
 */
const pdfRouter = express.Router();

/**
 * POST /api/pdf/compress
 */
pdfRouter.post(
  "/compress",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new HttpError(400, "A PDF file is required under the `file` field.");
    }

    validatePdf(req.file);

    const originalSize = req.file.size;
    const compressedBuffer = await compressPdfBuffer(req.file.buffer);
    const compressedSize = compressedBuffer.length;
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
      .send(compressedBuffer);
  }),
);

/**
 * POST /api/pdf/merge
 */
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

/**
 * POST /api/pdf/jpg-to-pdf
 */
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

/**
 * Error handling middleware
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File too large. Each file must be under 20MB." });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, ...(err.details && { details: err.details }) });
  }

  console.error("Unhandled error in request:", err);
  return res.status(500).json({ message: "Something went wrong" });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`MyPDFHero API running on http://localhost:${PORT}`);
});

/* -------------------------------------------------------------------------- */
/*                           Helper Types / Functions                          */
/* -------------------------------------------------------------------------- */

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

/**
 * Only allow JPEG/PNG for image-to-PDF route
 */
const allowedImageTypes = new Set(["image/jpeg", "image/png"]);

function validateImage(file: Express.Multer.File) {
  if (!allowedImageTypes.has(file.mimetype)) {
    throw new HttpError(400, `File ${file.originalname} must be a JPG or PNG image.`);
  }
}

/* -------------------------------------------------------------------------- */
/*                      PDF Compression (Ghostscript-based)                   */
/* -------------------------------------------------------------------------- */

async function compressPdfBuffer(buffer: Buffer): Promise<Buffer> {
  try {
    return await compressPdfWithGhostscript(buffer);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    console.error("Ghostscript compression failed, returning original file.", error);
    return buffer;
  }
}

/**
 * Compress a PDF via Ghostscript. The PDF is written to temp files so Ghostscript can
 * rewrite it using pdfwrite while keeping text searchable.
 */
async function compressPdfWithGhostscript(inputBuffer: Buffer): Promise<Buffer> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "mypdfhero-"));
  const inputPath = path.join(tmpDir, "input.pdf");
  await fs.writeFile(inputPath, inputBuffer);

  let bestBuffer = inputBuffer;
  let bestSize = inputBuffer.length;

  try {
    for (const preset of GHOSTSCRIPT_PRESETS) {
      const outputPath = path.join(tmpDir, `output-${preset.name}.pdf`);
      await runGhostscriptPreset(preset.args, inputPath, outputPath);
      const candidate = await fs.readFile(outputPath);
      if (candidate.length < bestSize) {
        bestBuffer = candidate;
        bestSize = candidate.length;
      }
      await fs.rm(outputPath, { force: true }).catch(() => undefined);
    }

    return bestBuffer;
  } finally {
    await Promise.allSettled([fs.rm(inputPath, { force: true }), fs.rm(tmpDir, { force: true, recursive: true })]);
  }
}

async function runGhostscriptPreset(presetArgs: string[], inputPath: string, outputPath: string) {
  const args = [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    ...presetArgs,
    `-sOutputFile=${outputPath}`,
    inputPath,
  ];

  await new Promise<void>((resolve, reject) => {
    execFile(GHOSTSCRIPT_BINARY, args, (error) => {
      if (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
          reject(new HttpError(500, `Ghostscript binary "${GHOSTSCRIPT_BINARY}" was not found. ${GHOSTSCRIPT_INSTALL_HELP}`));
        } else {
          reject(error);
        }
      } else {
        resolve();
      }
    });
  });
}

async function mergePdfFiles(files: Express.Multer.File[]): Promise<Uint8Array> {
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

/* -------------------------------------------------------------------------- */
/*                            Images → PDF (JPG/PNG)                           */
/* -------------------------------------------------------------------------- */

const PX_TO_PT = 72 / 96;

async function convertImagesToPdf(files: Express.Multer.File[]): Promise<Uint8Array> {
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
