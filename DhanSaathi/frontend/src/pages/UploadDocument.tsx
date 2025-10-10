import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Document {
  _id: string;
  filename: string;
  contentType: string;
  uploadDate: string;
}

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  // Get email from location.state
  const location = useLocation();
  const { email } = location.state as { email: string };
  console.log("User email:", email);

  // Fetch documents for the user
  const fetchDocuments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/documents?email=${email}`);
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [email]);

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        fetchDocuments();
      } else {
        console.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Document</h2>

      {/* Upload section */}
      <div className="flex gap-2 items-center mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border rounded p-2"
        />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Documents section */}
      <h3 className="text-lg font-semibold mb-2">Your Documents</h3>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc._id} className="p-2 border rounded flex flex-col items-center">
              {/* Display image preview */}
              {doc.contentType.startsWith("image/") ? (
                <img
                  src={`http://localhost:5000/api/documents/${doc._id}`}
                  alt={doc.filename}
                  className="h-32 w-full object-cover mb-1 rounded"
                />
              ) : (
                <p className="truncate mb-1">{doc.filename}</p>
              )}

              {/* Delete button */}
              <button
                onClick={() => handleDelete(doc._id)}
                className="mt-1 px-2 py-0.5 text-white bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
