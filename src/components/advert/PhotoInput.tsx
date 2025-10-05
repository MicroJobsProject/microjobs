import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

function PhotoInput() {
  const { t } = useTranslation("create");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
    setFile(files[0]);
    if (inputRef.current) {
      inputRef.current.files = files;
    }
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col lg:col-span-2">
      <span className="input-label">{t("Photo")}</span>
      <label
        htmlFor="photo"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex min-h-50 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 p-4 text-center hover:bg-gray-100"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-60 object-contain"
          />
        ) : (
          t("Drag and drop your photo here, or click to select")
        )}
      </label>
      <input
        ref={inputRef}
        id="photo"
        type="file"
        accept="image/*"
        name="photo"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

export default PhotoInput;
