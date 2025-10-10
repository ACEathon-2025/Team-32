import { useState } from "react";
import AuthModals from "./AuthModals";

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-black/30 backdrop-blur-xl border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            DhanSaathi
          </h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-amber-300 transition-colors duration-300 font-medium">Features</a>
          <a href="#" className="hover:text-amber-300 transition-colors duration-300 font-medium">Solutions</a>
          <a href="#" className="hover:text-amber-300 transition-colors duration-300 font-medium"
           onClick={() => setShowAuth(true)}>Signup</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-16 px-6 relative">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-amber-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-amber-300 text-sm font-medium"> Empowering users across India</span>
          </div>
          
         <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
  <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
    Your Financial
  </span>
  <br />
  <span className="text-amber-400">Assistant</span>
</h2>

<p className="text-slate-300 max-w-2xl mb-10 text-xl leading-relaxed">
  Check your eligibility, explore government schemes, find the right loans, and get personalized financial guidance — all in one place to make managing your finances effortless.
</p>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowAuth(true)}
              className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
            >
              <span className="relative z-10">Begin Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
            </button>
            {/* <button className="border border-amber-500/50 hover:border-amber-400 hover:bg-amber-500/10 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300">
              View Demo
            </button> */}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 mt-24 mb-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                Enterprise-Grade Features
              </span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive financial tools designed for precision and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Credit Intelligence", 
                desc: "Real-time credit scoring with predictive analytics and trend analysis",
                icon: "📊",
                gradient: "from-purple-500/20 to-blue-500/20"
              },
              { 
                title: "Loan Optimizer", 
                desc: "AI-powered eligibility assessment with optimal loan matching",
                icon: "⚡",
                gradient: "from-amber-500/20 to-orange-500/20"
              },
              { 
                title: "Smart Forms", 
                desc: "AI-assisted form completion with error detection and validation",
                icon: "🤖",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              { 
                title: "Scheme Matrix", 
                desc: "Comprehensive government and private scheme eligibility engine",
                icon: "🔍",
                gradient: "from-red-500/20 to-pink-500/20"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${feature.gradient} border border-white/10 hover:border-amber-400/30 p-8 rounded-2xl transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm`}
              >
                <div className="absolute inset-0 bg-black/50 rounded-2xl group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Financial Future?
          </h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already unlocked their financial potential with our advanced platform.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
     <footer className="bg-black/40 border-t border-amber-500/10 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2025 DhanSaathi. Your financial security is our priority.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-amber-300 text-xl font-bold transition-colors duration-300"
            >
              ✕
            </button>
            <AuthModals />
          </div>
        </div>
      )}
    </div>
  );
}