import { useRef, useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";


const INK = "#1a1816";
const PAPER = "#faf8f3";
const PAPER_2 = "#f3efe6";
const RULE = "#e5ddcd";
const CLAY = "#b6532f";
const MOSS = "#5b6b3a";
const MUTED = "#8a8175";
const OCHRE_SOFT = "#f7edd8";

export default function ResumeUpload({ onFileSelect }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return "No file selected.";
    if (selectedFile.type !== "application/pdf")
      return "Please upload a PDF file.";
    if (selectedFile.size > 5 * 1024 * 1024)
      return "Maximum file size is 5 MB.";
    return null;
  };

  const handleFile = (selectedFile) => {
    setError("");
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setError("");
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div className="mx-auto w-full max-w-2xl">
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className="group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed p-6 transition-all duration-300 sm:p-8"
          style={{
            borderColor: isDragging
              ? CLAY
              : file
              ? MOSS
              : RULE,
            background: isDragging
              ? "#fdf4ee"
              : file
              ? "#f6f7ee"
              : "#fffdf8",
          }}
        >
          {/* subtle dotted texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `radial-gradient(${RULE} 0.5px, transparent 0.5px)`,
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative w-full">
            {!file ? (
              /* ============ EMPTY STATE ============ */
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-[-6deg]"
                  style={{
                    background: isDragging ? CLAY : INK,
                    color: PAPER,
                    transform: isDragging ? "scale(1.08) rotate(-6deg)" : undefined,
                  }}
                >
                  <Upload size={22} strokeWidth={2} />
                </div>

                <h3
                  className="mt-5 text-lg leading-tight sm:text-xl"
                  style={{
                    color: INK,
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isDragging ? "Drop it right here." : "Drop your resume in."}
                </h3>

                <p
                  className="mt-2 max-w-[280px] text-[13px] leading-6"
                  style={{ color: MUTED }}
                >
                  Drag a PDF here, or{" "}
                  <span
                    className="font-semibold underline decoration-dotted underline-offset-4"
                    style={{ color: CLAY }}
                  >
                    browse your files
                  </span>
                  .
                </p>

                {/* meta strip */}
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase"
                    style={{
                      borderColor: RULE,
                      color: MUTED,
                      letterSpacing: "0.16em",
                      background: PAPER_2,
                    }}
                  >
                    PDF
                  </span>
                  <span
                    className="h-[1px] w-4"
                    style={{ background: RULE }}
                  />
                  <span
                    className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase"
                    style={{
                      borderColor: RULE,
                      color: MUTED,
                      letterSpacing: "0.16em",
                      background: PAPER_2,
                    }}
                  >
                    Max 5 MB
                  </span>
                </div>
              </div>
            ) : (
              /* ============ FILE PREVIEW ============ */
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                  {/* file icon badge */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: INK,
                      color: PAPER,
                    }}
                  >
                    <FileText size={22} strokeWidth={1.8} />
                  </div>

                  {/* file meta — truncation-safe */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-[14px] font-semibold leading-tight"
                      style={{ color: INK }}
                      title={file.name}
                    >
                      {file.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="rounded-full px-2 py-[2px] text-[10px] font-bold uppercase"
                        style={{
                          background: "#eef0e3",
                          color: MOSS,
                          letterSpacing: "0.14em",
                        }}
                      >
                        Ready
                      </span>
                      <span
                        className="text-[11.5px] tabular-nums"
                        style={{ color: MUTED }}
                      >
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                </div>

                {/* remove button — full-width on mobile, icon on desktop */}
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Remove file"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold transition-all duration-200 sm:w-auto sm:border-transparent sm:bg-transparent sm:px-2 sm:py-1.5"
                  style={{ color: MUTED, borderColor: RULE }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = CLAY;
                    e.currentTarget.style.background = "#f6e4dc";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = MUTED;
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = RULE;
                  }}
                >
                  <X size={16} strokeWidth={2.4} />
                  <span className="sm:hidden">Remove file</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============ ERROR STRIP ============ */}
        {error && (
          <div
            className="mt-3 flex items-start gap-2 rounded-xl border px-3.5 py-2.5"
            style={{
              borderColor: "#f0d5cb",
              background: "#fbf1ec",
              animation: "fadeSlide 0.35s ease-out both",
            }}
          >
            <AlertCircle
              size={15}
              style={{ color: CLAY, marginTop: 1, flexShrink: 0 }}
            />
            <p className="text-[12.5px] leading-5" style={{ color: "#7c3a20" }}>
              {error}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}