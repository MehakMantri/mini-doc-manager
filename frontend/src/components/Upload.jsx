import { useRef, useState } from "react";
import { uploadDocuments } from "../api";

export default function Upload({ onUpload }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setUploading(true);
    await uploadDocuments(selectedFiles);
    setUploading(false);

    // ✅ clear state + input
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onUpload();
  };

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-3">Upload Documents</h3>

      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) =>
            setSelectedFiles(Array.from(e.target.files))
          }
        />

        <button
          onClick={handleUpload}
          disabled={!selectedFiles.length || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">
          {selectedFiles.length} file(s) selected
        </p>
      )}
    </div>
  );
}
