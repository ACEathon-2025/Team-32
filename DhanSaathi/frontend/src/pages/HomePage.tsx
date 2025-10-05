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

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 flex justify-between items-center px-6 py-3 shadow-md ${
          darkMode ? "bg-gray-800" : "bg-purple-700 text-white"
        }`}
      >
        <h1 className="text-2xl font-bold">DhanSaathi</h1>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#signup" className="hover:underline">Signup/Login</a>
          <a href="#credit" className="hover:underline">Credit Scoring</a>
          <a href="#loan" className="hover:underline">Loan Eligibility</a>
          <a href="#bankform" className="hover:underline">Bank Form</a>
          <a href="#scheme" className="hover:underline">Schemes</a>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 text-center py-20 bg-gradient-to-br from-purple-600 to-purple-900 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4">Empowering Financial Inclusion</h2>
          <p className="text-lg opacity-90 mb-8">
            Check your credit score, loan eligibility, and government scheme benefits — all in one trusted place.
          </p>
          <button
            onClick={() =>
              document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-md hover:bg-gray-100 flex items-center gap-2 mx-auto transition"
          >
            Get Started <ArrowDown size={18} />
          </button>
        </div>
      </section>

      {/* Feature Overview */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
        {[
          {
            icon: <User />,
            title: "Signup / Login",
            desc: "Create your account to access personalized tools.",
          },
          {
            icon: <FileText />,
            title: "Credit Scoring",
            desc: "Enter details to calculate your credit score instantly.",
          },
          {
            icon: <CheckCircle />,
            title: "Loan Eligibility",
            desc: "Get approved/rejected loan results instantly.",
          },
          {
            icon: <Upload />,
            title: "Bank Form Upload",
            desc: "Upload forms and get filling guidance easily.",
          },
          {
            icon: <Award />,
            title: "Scheme Checker",
            desc: "Check which government schemes you qualify for.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 ${
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

      {/* Signup/Login */}
      <section
        id="signup"
        className={`p-10 max-w-6xl mx-auto transition-all duration-700 ${
          visibleSection === "signup"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          1. Signup / Login
        </h3>
        <p className="text-gray-600 mb-6">
          Securely create your account or log in to access personalized tools.
        </p>
        <div
          className={`p-6 rounded-2xl shadow-sm flex justify-center gap-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
            Sign Up
          </button>
          <button className="px-6 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-100">
            Log In
          </button>
        </div>
      </section>

      {/* Credit Scoring */}
      <section
        id="credit"
        className={`p-10 bg-gray-100 transition-all duration-700 ${
          visibleSection === "credit"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          2. Credit Scoring Form
        </h3>
        <p className="text-gray-600 mb-6">
          Fill in your income, EMI, and employment details to calculate your credit score and explanation.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Open Credit Form
        </button>
      </section>

      {/* Loan Eligibility */}
      <section
        id="loan"
        className={`p-10 max-w-6xl mx-auto transition-all duration-700 ${
          visibleSection === "loan"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          3. Loan Eligibility
        </h3>
        <p className="text-gray-600 mb-6">
          Based on your credit score, get instant loan eligibility with approval or rejection reasons.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Check Loan Status
        </button>
      </section>

      {/* Bank Form */}
      <section
        id="bankform"
        className={`p-10 bg-gray-100 transition-all duration-700 ${
          visibleSection === "bankform"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          4. Bank Form Upload & Guidance
        </h3>
        <p className="text-gray-600 mb-6">
          Upload your bank loan form and get step-by-step filling instructions.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Upload Bank Form
        </button>
      </section>

      {/* Scheme Checker */}
      <section
        id="scheme"
        className={`p-10 max-w-6xl mx-auto transition-all duration-700 ${
          visibleSection === "scheme"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          5. Government Scheme Eligibility
        </h3>
        <p className="text-gray-600 mb-6">
          Discover which government schemes or subsidies you qualify for.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Check Eligibility
        </button>
      </section>

      {/* Footer */}
      <footer
        className={`text-center py-6 mt-auto ${
          darkMode ? "bg-gray-800" : "bg-purple-700 text-white"
        }`}
      >
        <p>© {new Date().getFullYear()} DhanSaathi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
