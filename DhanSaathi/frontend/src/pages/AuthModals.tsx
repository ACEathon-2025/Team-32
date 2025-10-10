



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function AuthModals() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ----------------- HANDLERS -----------------
  const handleAuth = async () => {
  if (!email || !password || (mode === "signup" && !name)) {
    toast.error(`Please fill all ${mode === "signup" ? "fields" : "credentials"}`);
    return;
  }

  setIsLoading(true);

  try {
    if (mode === "signup") {
      // Signup via your backend API
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      const token = data.token; // JWT token from backend
      console.log("JWT Token:", token);

           toast.success("Signup successful!", {
  style: {
    backgroundColor: "#1E293B", // dark slate background
    color: "#1edb17ff",         // green text
    textAlign: "center",
  },
});
      navigate("/dashboard", { state: { name: data.name, token } });
      // After login success
// navigate("/dashboard", { state: { name: data.name,email:data.email, token } });


    } else {
      // Login via your backend API
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

    if (!response.ok) {
  toast.error(data.message || "Login failed", {
    style: {
      backgroundColor: "#1E293B", // dark slate background
      color: "#f02424ff",           // red text
      textAlign: "center",
    },
  });
  return;
}


      const token = data.token;
      console.log("JWT Token:", token);

     toast.success("Login successful!", {
  style: {
    backgroundColor: "#1E293B", // dark slate background
    color: "#1edb17ff",         // green text
    textAlign: "center",
  },
});

      navigate("/dashboard", { state: { name: data.name, token } });
      // navigate("/dashboard", { state: { name: data.name,email:data.email, token } });
    }
  } catch (error) {
    toast.error(`${mode === "login" ? "Login" : "Signup"} failed`);
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  // ----------------- UI -----------------
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Toaster position="top-center" richColors theme="dark" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
            DhanSaathi
          </h2>
        </div>
        <p className="text-slate-400 text-sm">
          {mode === "login" ? "Welcome back to your financial dashboard" : "Start your financial journey with us"}
        </p>
      </div>

      {/* Premium Tabs */}
      <div className="flex bg-slate-800/50 rounded-2xl p-1.5 border border-amber-500/20 mb-8">
        <button
          onClick={() => setMode("login")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === "login"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === "signup"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* FORM FIELDS */}
      <div className="w-full flex flex-col gap-4">
        {mode === "signup" && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="text-slate-400">👤</span>
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-slate-400">✉️</span>
          </div>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-slate-400">🔒</span>
          </div>
        </div>

        <button
          onClick={handleAuth}
          disabled={isLoading}
          className="group relative mt-4 w-full p-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-amber-500/25"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {mode === "login" ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              <>
                {mode === "login" ? "Sign In" : "Create Account"}
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
        </button>

        {/* Additional Links */}
        <div className="text-center mt-3">
          {/* <button className="text-slate-400 hover:text-amber-300 text-sm transition-colors duration-300">
            Forgot your password?
          </button> */}
          <div className="mt-4 text-slate-500 text-xs">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-300"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>

      {/* Security Note */}
     
    </div>
  );
}