// src/pages/AuthModals.tsx
import React, { useState } from "react";
import Modal from "../components/Modal"; // Your reusable modal component

const AuthModals: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup"); // toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // For now, just log the input values
    console.log(`${mode} - Email: ${email}, Password: ${password}`);
    // Later: call API or navigate
  };

  return (
    <Modal>
      <h2>{mode === "signup" ? "Sign Up" : "Login"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mt-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
      >
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>

      <p className="mt-2 text-sm text-center">
        {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="text-blue-500 cursor-pointer"
        >
          {mode === "signup" ? "Login" : "Sign Up"}
        </span>
      </p>
    </Modal>
  );
};

export default AuthModals;
