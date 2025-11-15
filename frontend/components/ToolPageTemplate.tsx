"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getApiBaseUrl } from "@/lib/config";

type ToolPageTemplateProps = {
  title: string;
  description: string;
  endpoint: string;
  fieldName: string;
  accept: string;
  helperText: string;
  primaryActionLabel: string;
  multiple?: boolean;
  maxFiles?: number;
};

type UploadStats = {
  originalSize: number;
  compressedSize: number;
  reductionPercent: number;
};

type UploadResult = {
  downloadUrl: string;
  fileName: string;
  stats?: UploadStats;
};

const SAVED_INDICATOR_RADIUS = 54;
const SAVED_INDICATOR_CIRCUMFERENCE = 2 * Math.PI * SAVED_INDICATOR_RADIUS;

export function ToolPageTemplate({
  title,
  description,
  endpoint,
  fieldName,
  accept,
  helperText,
  primaryActionLabel,
  multiple = false,
  maxFiles = 10,
}: ToolPageTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [targetProgress, setTargetProgressState] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [savedPercentAnimated, setSavedPercentAnimated] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const updateProgress = useCallback((value: number | ((prev: number) => number)) => {
    if (typeof value === "function") {
      setProgressState((prev) => {
        const next = value(prev);
        progressRef.current = next;
        return next;
      });
    } else {
      progressRef.current = value;
      setProgressState(value);
    }
  }, []);
  const updateTargetProgress = useCallback((value: number) => {
    targetProgressRef.current = value;
    setTargetProgressState(value);
  }, []);

  const apiUrl = `${getApiBaseUrl()}${endpoint}`;
  const maxSizeLabel = "20MB";

  useEffect(() => {
    return () => {
      if (result?.downloadUrl) {
        URL.revokeObjectURL(result.downloadUrl);
      }
    };
  }, [result]);

  useEffect(() => {
    if (progress >= targetProgress) return;
    const interval = setInterval(() => {
      updateProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        const next = prev + Math.max(1, (targetProgress - prev) * 0.15);
        return next > targetProgress ? targetProgress : next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [targetProgress, progress, updateProgress]);

  const savedPercent = useMemo(() => {
    if (!result?.stats) return null;
    const { originalSize, compressedSize, reductionPercent } = result.stats;
    if (originalSize > 0) {
      const saved = ((originalSize - compressedSize) / originalSize) * 100;
      return Math.max(0, Math.min(100, Math.round(saved)));
    }
    if (typeof reductionPercent === "number") {
      return Math.max(0, Math.min(100, Math.round(reductionPercent)));
    }
    return null;
  }, [result?.stats]);

  useEffect(() => {
    if (savedPercent === null) {
      setSavedPercentAnimated(0);
      return;
    }
    setSavedPercentAnimated(0);
    const frame = requestAnimationFrame(() => {
      setSavedPercentAnimated(savedPercent);
    });
    return () => cancelAnimationFrame(frame);
  }, [savedPercent]);

  useEffect(() => {
    if (!result) {
      setShowResultModal(false);
      return;
    }
    if (isProcessing || progress < 100) return;
    const timer = setTimeout(() => setShowResultModal(true), 150);
    return () => clearTimeout(timer);
  }, [result, isProcessing, progress]);

  const waitForProgressCompletion = useCallback(() => {
    if (targetProgressRef.current < 100 || progressRef.current >= 99.5) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const tick = () => {
        if (progressRef.current >= 99.5) {
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const asArray = Array.from(incoming);
      const filtered = asArray.filter((file) => file.type && file.type.match(acceptToRegex(accept)));
      if (filtered.length !== asArray.length) {
        setError("Some files were skipped because they are not in the supported format.");
      } else {
        setError(null);
      }

      const merged = multiple ? [...files, ...filtered] : filtered.slice(0, 1);
      if (merged.length > maxFiles) {
        setError(`You can upload up to ${maxFiles} files at a time.`);
        merged.splice(maxFiles);
      }
      setFiles(merged);
      setResult(null);
      setShowResultModal(false);
      updateProgress(0);
      updateTargetProgress(0);
      setProgressMessage("");
    },
    [accept, files, maxFiles, multiple, updateProgress, updateTargetProgress],
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files?.length) {
        addFiles(event.dataTransfer.files);
      }
    },
    [addFiles],
  );

  const formatBytes = useCallback((bytes: number) => {
    if (!Number.isFinite(bytes)) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }
    return `${value.toFixed(1)} ${units[unitIndex]}`;
  }, []);

  const handleUpload = useCallback(async () => {
    if (!files.length) {
      setError("Please select at least one file.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    updateProgress(0);
    updateTargetProgress(15);
    setProgressMessage("Processing PDF…");

    try {
      setShowResultModal(false);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(fieldName, file);
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      updateTargetProgress(55);

      if (!response.ok) {
        const text = await response.text();
        const json = tryParseJson(text);
        throw new Error(json?.message || text || "Something went wrong. Please try again.");
      }

      const blob = await response.blob();
      updateTargetProgress(80);
      const statsHeader = response.headers.get("x-pdf-stats");
      let stats: UploadStats | undefined;
      if (statsHeader) {
        stats = tryParseJson(statsHeader) as UploadStats | undefined;
      }

      const downloadUrl = URL.createObjectURL(blob);
      const fileName =
        extractFilename(response.headers.get("content-disposition")) || `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`;

      setResult({
        downloadUrl,
        fileName,
        stats,
      });
      updateTargetProgress(100);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      await waitForProgressCompletion();
      await new Promise((resolve) => setTimeout(resolve, 150));
      setIsProcessing(false);
      setTimeout(() => {
        updateTargetProgress(0);
        updateProgress(0);
        setProgressMessage("");
      }, 800);
    }
  }, [apiUrl, fieldName, files, title, updateProgress, updateTargetProgress, waitForProgressCompletion]);

  const removeFile = useCallback(
    (index: number) => {
      setFiles((prev) => prev.filter((_, idx) => idx !== index));
    },
    [setFiles],
  );

  const resetAll = useCallback(() => {
    setFiles([]);
    setResult(null);
    setError(null);
    setShowResultModal(false);
    updateProgress(0);
    updateTargetProgress(0);
    setProgressMessage("");
  }, [updateProgress, updateTargetProgress]);

  const dropzoneText = useMemo(() => {
    if (!files.length) {
      return multiple ? "Drop your files here or click to browse" : "Drop your PDF here or click to browse";
    }
    return `${files.length} file${files.length === 1 ? "" : "s"} ready`;
  }, [files.length, multiple]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-4xl flex-col gap-6 px-4 pb-8 pt-6 text-[#120529]">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold leading-tight text-[#120529] md:text-4xl">{title}</h1>
        <p className="text-base text-[#4b3b63] md:text-lg">{description}</p>
      </div>

      <div className="relative rounded-[32px] border border-purple-100 bg-white p-6 shadow-xl md:p-8">
        {isProcessing && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[32px] bg-white/90 backdrop-blur">
            <div className="w-full max-w-sm space-y-3 text-center">
              <p className="text-sm font-semibold text-[#120529]">{progressMessage || "Processing PDF…"}</p>
              <div className="h-2 w-full rounded-full bg-purple-100">
                <div
                  className="h-full rounded-full bg-[#7c3aed] transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
        <div className={`mx-auto max-w-3xl ${isProcessing ? "opacity-75 blur-[1px]" : ""}`}>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-[#120529]">Upload files</p>
            <p className="text-sm text-[#4b3b63] md:text-base">{helperText}</p>
          </div>

          <div
            className={`mt-6 rounded-[28px] border border-dashed p-8 text-center shadow-lg transition ${
              isDragging ? "border-black bg-[#f3f4f6]" : "border-[#d4d4d8] bg-white"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={onDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept={accept}
              multiple={multiple}
              onChange={(event) => {
                if (event.target.files) {
                  addFiles(event.target.files);
                }
              }}
            />
            <p className="text-xl font-semibold text-[#120529]">{dropzoneText}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.4em] text-[#a1a1aa]">or drag & drop</p>
            <p className="mt-3 text-sm text-[#4b3b63] md:text-base">
              {multiple ? `Up to ${maxFiles} files, ${maxSizeLabel} each.` : `Max size ${maxSizeLabel}.`}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-black bg-black px-9 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-white hover:text-black"
              onClick={() => inputRef.current?.click()}
            >
              Browse files
            </button>
          </div>

          {files.length > 0 && (
            <ul className="mt-6 space-y-2 text-sm text-[#4b3b63] md:text-base">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-full bg-[#f6f0ff] px-4 py-2.5"
                >
                  <span className="truncate text-[#120529]">{file.name}</span>
                  <div className="ml-4 flex items-center gap-3">
                    <span className="text-xs text-[#4b3b63] md:text-sm">{formatBytes(file.size)}</span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#7c3aed] md:text-sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 md:text-base">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-full bg-[#7c3aed] py-3 text-lg font-semibold text-white transition hover:bg-[#6d32d4] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleUpload}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing…" : primaryActionLabel}
            </button>
            <button
              type="button"
              className="flex-1 rounded-full border border-purple-200 py-3 text-lg font-semibold text-[#7c3aed]"
              onClick={resetAll}
              disabled={isProcessing && !result}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {result && showResultModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowResultModal(false)} />
          <div className="relative z-10 w-full max-w-2xl rounded-[36px] border border-purple-100 bg-white p-8 text-[#120529] shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-purple-400">Success</p>
                <h3 className="text-3xl font-semibold">Your PDF is lighter now.</h3>
                <p className="text-sm text-[#4b3b63]">
                  {result.stats
                    ? `You saved ${formatBytes(result.stats.originalSize - result.stats.compressedSize)} (${savedPercent ?? result.stats.reductionPercent}% smaller).`
                    : "Download it instantly or start another task."}
                </p>
              </div>
              <a
                href={result.downloadUrl}
                download={result.fileName}
                className="inline-flex items-center justify-center rounded-full bg-[#7c3aed] px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#6d32d4]"
              >
                Download file
              </a>
            </div>
            {result.stats && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-purple-50 bg-gradient-to-br from-[#f6f0ff] to-[#ffeefe] p-6 text-center">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r={SAVED_INDICATOR_RADIUS}
                        stroke="#e5dbff"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={SAVED_INDICATOR_RADIUS}
                        stroke="#7c3aed"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={SAVED_INDICATOR_CIRCUMFERENCE}
                        style={{
                          strokeDashoffset:
                            SAVED_INDICATOR_CIRCUMFERENCE -
                            (savedPercentAnimated / 100) * SAVED_INDICATOR_CIRCUMFERENCE,
                          transition: "stroke-dashoffset 0.8s ease",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#120529]">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#7c3aed]">You saved</p>
                      <p className="text-4xl font-black">{savedPercent ?? result.stats.reductionPercent}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4b3b63]">
                    Based on {formatBytes(result.stats.originalSize)} &rarr; {formatBytes(result.stats.compressedSize)}
                  </p>
                  <p className="text-xs font-semibold text-[#0ba07f]">
                    {formatBytes(result.stats.originalSize - result.stats.compressedSize)} lighter total
                  </p>
                </div>
                <div className="rounded-3xl border border-purple-50 bg-white p-6 text-sm text-[#4b3b63]">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#120529]">Original</span>
                    <span>{formatBytes(result.stats.originalSize)}</span>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <span className="font-semibold text-[#120529]">Compressed</span>
                    <span>{formatBytes(result.stats.compressedSize)}</span>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <span className="font-semibold text-[#120529]">Space saved</span>
                    <span>{formatBytes(result.stats.originalSize - result.stats.compressedSize)}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-8 rounded-3xl border border-purple-50 bg-[#faf7ff] p-6 text-sm text-[#4b3b63]">
              <p className="font-semibold text-[#120529]">Next up?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Merge PDF", "Split PDF", "Add watermark", "Rotate pages"].map((action) => (
                  <span key={action} className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-[#7c3aed]">
                    {action}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-full border border-purple-200 py-3 text-base font-semibold text-[#7c3aed]"
              onClick={() => setShowResultModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function tryParseJson(value: string | null) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractFilename(disposition: string | null) {
  if (!disposition) return null;
  const match = disposition.match(/filename="?([^"]+)"?/i);
  return match?.[1] ?? null;
}

function acceptToRegex(accept: string) {
  if (accept.includes("image")) return /^image\//;
  if (accept.includes("pdf")) return /pdf$/;
  return /.*/;
}
