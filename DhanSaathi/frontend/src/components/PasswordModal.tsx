import React, { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  email: string; // logged-in user email
}

export default function PasswordModal({ isOpen, onClose, onSuccess, email }: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"verify" | "set">("verify"); // default: verify

  useEffect(() => {
    // Check if documentsPassword exists for this user
    if (!isOpen) return;
    const checkPassword = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/documents/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "" }), // send empty password to check existence
        });
        if (res.status === 404) setMode("set"); // password not set
        else setMode("verify");
      } catch {
        setMode("verify");
      }
    };
    checkPassword();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "set") {
        // Set new documents password
        const res = await fetch("http://localhost:5000/api/documents/set-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) onSuccess();
        else {
          const data = await res.json();
          setError(data.message || "Failed to set password");
        }
      } else {
        // Verify password
        const res = await fetch("http://localhost:5000/api/documents/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) onSuccess();
        else setError("Incorrect password");
      }
    } catch  {
      setError("Network error");
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-11/12 max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-center">
          {mode === "set" ? "Set Documents Password" : "Enter Documents Password"}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-2 bg-gray-50 dark:bg-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1 bg-blue-600 text-white rounded-md"
            >
              {loading ? "Checking..." : mode === "set" ? "Set Password" : "Enter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
