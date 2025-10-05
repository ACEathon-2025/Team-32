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

  // Smooth section scroll detection
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

  // Handle smooth dark mode toggle animation
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
        <h1 className="text-2xl font-bold">DhanSaathi</h1>

        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#signup" className="hover:underline">
            Signup/Login
          </a>
          <a href="#credit" className="hover:underline">
            Credit Scoring
          </a>
          <a href="#loan" className="hover:underline">
            Loan Eligibility
          </a>
          <a href="#bankform" className="hover:underline">
            Bank Form
          </a>
          <a href="#scheme" className="hover:underline">
            Schemes
          </a>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-500 ease-in-out transform hover:scale-110 ${
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
            className="mt-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-md hover:bg-gray-100 flex items-center gap-2 mx-auto transition-all duration-500 hover:scale-105"
          >
            Get Started <ArrowDown size={18} />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-10 transition-all duration-700 ease-in-out">
        {[
          { icon: <User />, title: "Signup / Login", desc: "Create your account to access personalized tools." },
          { icon: <FileText />, title: "Credit Scoring", desc: "Enter details to calculate your credit score instantly." },
          { icon: <CheckCircle />, title: "Loan Eligibility", desc: "Get approved/rejected loan results instantly." },
          { icon: <Upload />, title: "Bank Form Upload", desc: "Upload forms and get filling guidance easily." },
          { icon: <Award />, title: "Scheme Checker", desc: "Check which government schemes you qualify for." },
        ].map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3 text-purple-700 mb-3">
              {f.icon}
              <h4 className="font-semibold text-lg">{f.title}</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Other Sections (same as before, with transitions) */}
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
            <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all duration-500 hover:scale-105">
              {s.button}
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
