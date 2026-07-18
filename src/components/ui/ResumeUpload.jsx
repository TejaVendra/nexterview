import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

export default function ResumeUpload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or Word document.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="group mx-auto flex min-h-[220px] w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white p-8 transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-50"
      >
        {!file ? (
          <>
            <div className="rounded-full bg-cyan-100 p-4 text-cyan-600 transition group-hover:scale-110">
              <Upload size={34} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-800">
              Upload Your Resume
            </h3>

            <p className="mt-2 text-center text-gray-500">
              Drag & drop your resume here or{" "}
              <span className="font-semibold text-cyan-600">
                browse files
              </span>
            </p>

            <p className="mt-4 text-sm text-gray-400">
              PDF, DOC, DOCX • Max 5 MB
            </p>
          </>
        ) : (
          <div className="flex w-full items-center justify-between rounded-2xl bg-green-50 p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <FileText size={28} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="rounded-full p-2 text-gray-500 transition hover:bg-red-100 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}