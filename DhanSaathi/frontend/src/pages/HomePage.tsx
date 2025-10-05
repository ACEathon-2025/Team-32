
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">DhanSaathi</h1>
        <div className="space-x-6">
          <a href="#signup" className="hover:underline">Signup/Login</a>
          <a href="#credit" className="hover:underline">Credit Scoring</a>
          <a href="#loan" className="hover:underline">Loan Eligibility</a>
          <a href="#bankform" className="hover:underline">Bank Form</a>
          <a href="#scheme" className="hover:underline">Schemes</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-purple-600 to-purple-900 text-white">
        <h2 className="text-4xl font-bold mb-4">Empowering Financial Inclusion</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Easily check your credit score, loan eligibility, and government scheme benefits — all in one place.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-md hover:bg-gray-100">
          Get Started
        </button>
      </section>

      {/* Signup/Login Section */}
      <section id="signup" className="p-10 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">1. Signup / Login</h3>
        <p className="text-gray-600 mb-6">
          Securely create your account or log in to access personalized financial tools.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-center gap-6">
          <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800">Sign Up</button>
          <button className="px-6 py-2 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-100">Log In</button>
        </div>
      </section>

      {/* Credit Scoring Section */}
      <section id="credit" className="p-10 bg-gray-100">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">2. Credit Scoring Form</h3>
        <p className="text-gray-600 mb-6">
          Fill in details like income, EMI, and employment type to calculate your credit score and see explanation.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Open Credit Form
        </button>
      </section>

      {/* Loan Eligibility Section */}
      <section id="loan" className="p-10 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">3. Loan Eligibility</h3>
        <p className="text-gray-600 mb-6">
          Based on your credit score, get instant loan eligibility status with reasons for approval or rejection.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Check Loan Status
        </button>
      </section>

      {/* Bank Form Upload Section */}
      <section id="bankform" className="p-10 bg-gray-100">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">4. Bank Form Upload & Guidance</h3>
        <p className="text-gray-600 mb-6">
          Upload your bank form and receive step-by-step guidance on how to fill it properly.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Upload Bank Form
        </button>
      </section>

      {/* Scheme Eligibility Section */}
      <section id="scheme" className="p-10 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-purple-700 mb-4">5. Government Scheme Eligibility</h3>
        <p className="text-gray-600 mb-6">
          Check which government schemes or subsidies you qualify for based on your profile and credit score.
        </p>
        <button className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800">
          Check Eligibility
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-purple-700 text-white mt-10">
        <p>© {new Date().getFullYear()} DhanSaathi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
