
// src/pages/Dashboard.tsx
import { useLocation, useNavigate } from "react-router-dom";
import SidePanel from "../components/SidePanel";
import { useState } from "react";

export default function Dashboard() {
  const location = useLocation();
  const name = location.state?.name || "User";
  const navigate = useNavigate();
   const [panelOpen, setPanelOpen] = useState(false);

  const features = [
    {
      title: "Form Helper",
      description: "AI-assisted form completion with error detection",
      icon: "📝",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      onClick: () => navigate("/form-helper")
    },
    {
      title: "Loan Eligibility",
      description: "AI-powered assessment with optimal loan matching",
      icon: "⚡",
      gradient: "from-purple-500/20 to-blue-500/20",
      border: "border-purple-500/30",
      onClick: () => navigate("/eligibility")
    },
    {
      title: "Scheme Checker",
      description: "Comprehensive government and private scheme eligibility",
      icon: "🔍",
      gradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
      onClick: () => navigate("/scheme-checker")
    },
    
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black/30 backdrop-blur-xl border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            DhanSaathi
          </h1>
        </div>
         {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white"> */}
         <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setPanelOpen(true)}>
        <div className="text-sm text-slate-300">Logout</div>
        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {name.charAt(0).toUpperCase()}
        </div>
      {/* </div> */}

      {/* Side Panel */}
      <SidePanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} name={name} />
    </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
      <div className="text-center mb-16">
         
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Welcome, {name}
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Your financial dashboard is ready. Explore powerful tools to optimize your financial health and discover new opportunities.
          </p>
        </div>



        {/* Feature Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mb-16 justify-center">
  {features.map((feature, index) => (
    <div
      key={index}
      onClick={feature.onClick}
      className={`group relative bg-gradient-to-br ${feature.gradient} border ${feature.border} p-8 rounded-2xl cursor-pointer transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm hover:shadow-2xl hover:shadow-amber-500/10`}
    >
      <div className="absolute inset-0 bg-black/50 rounded-2xl group-hover:bg-black/40 transition-colors duration-300"></div>
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {feature.description}
        </p>
        <div className="mt-6 flex items-center text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
          <span className="text-sm font-medium">Explore</span>
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Quick Stats */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              Financial Overview
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Credit Score Ready", value: "Updated Today", status: "positive" },
              { label: "Active Applications", value: "2 Pending", status: "warning" },
              { label: "Eligible Schemes", value: "5 Available", status: "positive" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-700/20 rounded-xl border border-slate-600/30">
                <div className="text-slate-300 text-sm mb-2">{stat.label}</div>
                <div className={`text-lg font-semibold ${
                  stat.status === "positive" ? "text-green-400" : 
                  stat.status === "warning" ? "text-amber-400" : "text-white"
                }`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
       <div className="mt-16 text-center">
  <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-12 backdrop-blur-sm relative overflow-hidden max-w-3xl mx-auto">
    {/* Decorative blurred circles */}
    <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

    {/* Section Title */}
    <h3 className="text-3xl font-bold mb-6">
      <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
        Contact Us
      </span>
    </h3>
    <p className="text-slate-300 text-lg mb-8">
      Have questions or need assistance? Reach out to our financial experts and we’ll get back to you promptly.
    </p>

    {/* Contact Form */}
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="p-4 rounded-xl border border-slate-600/50 bg-slate-700/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="p-4 rounded-xl border border-slate-600/50 bg-slate-700/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        className="p-4 rounded-xl border border-slate-600/50 bg-slate-700/20 text-white placeholder-slate-400 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
      ></textarea>
      <button
        type="submit"
        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 col-span-1 md:col-span-2"
      >
        Send Message
      </button>
    </form>
  </div>
</div>


      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-amber-500/10 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2025 DhanSaathi. Your financial security is our priority.
          </p>
        </div>
      </footer>
    </div>
  );
}