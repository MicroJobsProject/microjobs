import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PhotoInputProps {
  onInvalidFile?: () => void;
}

function PhotoInput({ onInvalidFile }: PhotoInputProps) {
  const { t } = useTranslation("create");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const selectedFile = files[0];

    if (!selectedFile.type.startsWith("image/")) {
      setError(t("Please select a valid image file (JPG, PNG, GIF, etc.)"));
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      if (onInvalidFile) onInvalidFile();
      return;
    }

    setError(null);
    setFile(selectedFile);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function handleRemoveFile() {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col lg:col-span-2">
      <span className="input-label">Photo</span>

      <label
        htmlFor="photo"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative flex min-h-50 cursor-pointer items-center justify-center rounded-lg border border-dashed p-4 text-center transition-colors ${
          error
            ? "border-red-400 text-red-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-md object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="bg-opacity-80 hover:bg-opacity-100 absolute top-2 right-2 rounded-full bg-white p-1 shadow"
              aria-label="Remove selected photo"
            >
              <span className="material-symbols-outlined text-xl text-gray-600">
                close
              </span>
            </button>
          </div>
        ) : (
          <span className="text-gray-500">
            {t("Drag & drop your photo here, or click to select")}
          </span>
        )}
      </label>

      <input
        ref={inputRef}
        id="photo"
        type="file"
        accept="image/*"
        name="photo"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default PhotoInput;
