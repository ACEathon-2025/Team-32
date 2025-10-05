import  { useState, useEffect } from "react";
import {
  ArrowDown,
  Moon,
  Sun,
  User,
  FileText,
  CheckCircle,
  Upload,
  Award,
} from "lucide-react";

const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          setVisibleSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setAnimating(true);
    setDarkMode(!darkMode);
    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-700 ease-in-out ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } ${animating ? "scale-[1.01]" : "scale-100"} transition-transform duration-500`}
    >
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 flex justify-between items-center px-6 py-3 shadow-md transition-all duration-700 ease-in-out ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-purple-700 text-white"
        }`}
      >
        <h1 className="text-2xl font-bold tracking-wide">DhanSaathi</h1>

        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {["Signup/Login", "Credit Scoring", "Loan Eligibility", "Bank Form", "Schemes"].map(
            (label, i) => {
              const id = ["signup", "credit", "loan", "bankform", "scheme"][i];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="relative group overflow-hidden"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                </a>
              );
            }
          )}
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] ${
            darkMode
              ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
              : "bg-white/30 text-white hover:bg-white/40"
          }`}
          title="Toggle Theme"
        >
          <div
            className={`transition-transform duration-500 ${
              darkMode ? "rotate-180" : "rotate-0"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 text-center py-20 bg-gradient-to-br from-purple-600 to-purple-900 text-white transition-all duration-700 ease-in-out">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4 animate-fadeIn">
            Empowering Financial Inclusion
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Check your credit score, loan eligibility, and government scheme benefits — all in one trusted place.
          </p>
          <button
            onClick={() =>
              document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-md relative overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started <ArrowDown size={18} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-all duration-700 ease-in-out" />
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
        {[
          { icon: <User />, title: "Signup / Login", desc: "Create your account to access personalized tools." },
          { icon: <FileText />, title: "Credit Scoring", desc: "Enter details to calculate your credit score instantly." },
          { icon: <CheckCircle />, title: "Loan Eligibility", desc: "Get approved/rejected loan results instantly." },
          { icon: <Upload />, title: "Bank Form Upload", desc: "Upload forms and get filling guidance easily." },
          { icon: <Award />, title: "Scheme Checker", desc: "Check which government schemes you qualify for." },
        ].map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-1 hover:scale-[1.03] ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 ease-in-out"></div>
            <div className="relative z-10 flex items-center gap-3 text-purple-700 mb-3">
              {f.icon}
              <h4 className="font-semibold text-lg">{f.title}</h4>
            </div>
            <p className="relative z-10 text-gray-600 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Sections */}
      {[
        {
          id: "signup",
          title: "1. Signup / Login",
          desc: "Securely create your account or log in to access personalized tools.",
          button: "Sign Up / Log In",
        },
        {
          id: "credit",
          title: "2. Credit Scoring Form",
          desc: "Fill in your income, EMI, and employment details to calculate your credit score and explanation.",
          button: "Open Credit Form",
        },
        {
          id: "loan",
          title: "3. Loan Eligibility",
          desc: "Based on your credit score, get instant loan eligibility with approval or rejection reasons.",
          button: "Check Loan Status",
        },
        {
          id: "bankform",
          title: "4. Bank Form Upload & Guidance",
          desc: "Upload your bank loan form and get step-by-step filling instructions.",
          button: "Upload Bank Form",
        },
        {
          id: "scheme",
          title: "5. Government Scheme Eligibility",
          desc: "Discover which government schemes or subsidies you qualify for.",
          button: "Check Eligibility",
        },
      ].map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`p-10 transition-all duration-700 ease-in-out ${
            visibleSection === s.id
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">{s.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{s.desc}</p>
            <button className="px-6 py-3 bg-purple-700 text-white rounded-lg relative overflow-hidden group transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <span className="relative z-10">{s.button}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-700 opacity-0 group-hover:opacity-20 blur-md transition-all duration-700 ease-in-out" />
            </button>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer
        className={`text-center py-6 mt-auto transition-all duration-700 ease-in-out ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-purple-700 text-white"
        }`}
      >
        <p>© {new Date().getFullYear()} DhanSaathi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
