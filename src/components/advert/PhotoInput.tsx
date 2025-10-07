import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import imageCompression from "browser-image-compression";

interface PhotoInputProps {
  onInvalidFile?: () => void;
  onFileSelect?: (file: File | null) => void;
  onCompressingChange?: (isCompressing: boolean) => void; // 👈 nueva prop
}

function PhotoInput({
  onInvalidFile,
  onFileSelect,
  onCompressingChange,
}: PhotoInputProps) {
  const { t } = useTranslation("create");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
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

  async function handleFiles(files: FileList | null) {
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

    try {
      setError(null);
      setIsCompressing(true);
      onCompressingChange?.(true); // 👈 avisa al padre

      const compressedBlob = await imageCompression(selectedFile, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      const compressedFile = new File([compressedBlob], selectedFile.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(compressedFile);
      if (inputRef.current) inputRef.current.files = dataTransfer.files;

      setFile(compressedFile);
      onFileSelect?.(compressedFile);
    } catch (err) {
      console.error("Error compressing image:", err);
      setError(t("Error compressing the image. Please try again."));
    } finally {
      setIsCompressing(false);
      onCompressingChange?.(false);
    }
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
    onFileSelect?.(null);
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
        {isCompressing ? (
          // 🌀 Spinner
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="mb-2 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
            <span className="text-sm">{t("Compressing image...")}</span>
          </div>
        ) : preview ? (
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
