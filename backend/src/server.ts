import cors from "cors";
import express, { Request, Response } from "express";
import multer from "multer";

const PORT = Number(process.env.PORT) || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB per file
    files: 10,
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

pdfRouter.post("/compress", upload.array("files"), (req: Request, res: Response) => {
  const count = Array.isArray(req.files) ? req.files.length : 0;
  res.json({ message: "Compress not implemented yet", filesReceived: count });
});

pdfRouter.post("/merge", upload.array("files"), (req: Request, res: Response) => {
  const count = Array.isArray(req.files) ? req.files.length : 0;
  res.json({ message: "Merge not implemented yet", filesReceived: count });
});

pdfRouter.post("/jpg-to-pdf", upload.array("files"), (req: Request, res: Response) => {
  const count = Array.isArray(req.files) ? req.files.length : 0;
  res.json({ message: "JPG to PDF not implemented yet", filesReceived: count });
});

app.use("/api/pdf", pdfRouter);

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`MyPDFHero API running on http://localhost:${PORT}`);
});
