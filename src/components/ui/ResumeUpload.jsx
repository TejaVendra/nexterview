import { useRef, useState } from "react";

export default function ResumeUpload() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
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
        className="flex h-30 md:h-40 xl:h-50 w-75 md:w-120 xl:w-150 mx-auto cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-green-500 hover:bg-green-50"
      >
        <p className="text-lg font-semibold">
          Drag & Drop your resume here
        </p>

        <p className="mt-2 text-gray-500">
          or <span className="text-green-600 font-medium">click to browse</span>
        </p>

        {file && (
          <p className="mt-4 text-sm font-medium text-green-600">
            📄 {file.name}
          </p>
        )}
      </div>
    </>
  );
}