// src/pages/AuthModals.tsx
import React, { useState } from "react";
import Modal from "../components/Modal";

const AuthModals: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState(""); // new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // new
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log(`${mode} - Name: ${name}, Email: ${email}, Password: ${password}`);
  };

  return (
    <Modal isOpen={true} onClose={() => console.log("Modal closed")}>
      <h2 className="text-3xl font-bold mb-6 text-center">
        {mode === "signup" ? "Sign Up" : "Login"}
      </h2>

      {mode === "signup" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {mode === "signup" && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded w-full font-semibold transition-colors"
      >
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>

      <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
        {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-blue-500 cursor-pointer font-medium hover:underline"
        >
          {mode === "signup" ? "Login" : "Sign Up"}
        </span>
      </p>
    </Modal>
  );
};

export default AuthModals;
