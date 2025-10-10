// src/pages/CreditEligibility.tsx
import React, { useState, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const LoanEligibility: React.FC = () => {
  const [income, setIncome] = useState<string>("");
  const [emi, setEmi] = useState<string>("");
  const [billsOnTime, setBillsOnTime] = useState<boolean>(true);
  const [employmentType, setEmploymentType] = useState<string>("salaried");
  const [creditHistory, setCreditHistory] = useState<string>("");
  const [loansCount, setLoansCount] = useState<string>("");
  const [savings, setSavings] = useState<string>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("personal");

  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loan, setLoan] = useState<{ name: string; amount: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const gaugeRef = useRef<HTMLDivElement>(null);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!income) newErrors.income = "Please enter monthly income";
    else if (Number(income) <= 0) newErrors.income = "Income must be positive";

    if (!emi) newErrors.emi = "Please enter EMI amount";
    else if (Number(emi) < 0) newErrors.emi = "EMI cannot be negative";

    if (!creditHistory) newErrors.creditHistory = "Please enter credit history years";
    else if (Number(creditHistory) < 0) newErrors.creditHistory = "Credit history cannot be negative";

    if (!loansCount) newErrors.loansCount = "Please enter number of active loans";
    else if (Number(loansCount) < 0) newErrors.loansCount = "Loans count cannot be negative";

    if (!savings) newErrors.savings = "Please enter savings amount";
    else if (Number(savings) < 0) newErrors.savings = "Savings cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const incomeNum = Number(income) || 0;
    const emiNum = Number(emi) || 0;
    const creditYears = Number(creditHistory) || 0;
    const loansNum = Number(loansCount) || 0;
    const savingsNum = Number(savings) || 0;

    const baseScore = 300;

    let incomeScore = 0;
    if (incomeNum < 10000) incomeScore = 20;
    else if (incomeNum < 25000) incomeScore = 50;
    else if (incomeNum < 50000) incomeScore = 80;
    else incomeScore = 100;

    let emiScore = 0;
    const emiPercent = incomeNum > 0 ? (emiNum / incomeNum) * 100 : 0;
    if (emiPercent > 50) emiScore = -50;
    else if (emiPercent > 30) emiScore = -20;
    else emiScore = 0;

    const billsScore = billsOnTime ? 50 : 0;

    let employmentScore = 0;
    if (employmentType === "salaried") employmentScore = 50;
    else if (employmentType === "self-employed") employmentScore = 30;
    else employmentScore = 20;

    let creditScoreHistory = 0;
    if (creditYears >= 5) creditScoreHistory = 150;
    else if (creditYears >= 3) creditScoreHistory = 130;
    else if (creditYears >= 1) creditScoreHistory = 115;

    let loansScore = 0;
    if (loansNum > 5) loansScore = -50;
    else if (loansNum > 3) loansScore = -30;
    else if (loansNum > 1) loansScore = -10;

    let savingsScore = 0;
    if (savingsNum < 10000) savingsScore = 10;
    else if (savingsNum < 50000) savingsScore = 30;
    else if (savingsNum < 100000) savingsScore = 50;
    else savingsScore = 60;

    const finalScore = Math.min(
      900,
      Math.max(
        300,
        baseScore +
          incomeScore +
          emiScore +
          billsScore +
          employmentScore +
          creditScoreHistory +
          loansScore +
          savingsScore
      )
    );

    setCreditScore(finalScore);
let loanName = "";
let loanAmount = "";

if (finalScore >= 300 && finalScore <= 699) {
  loanName = "BasicAssist Loan";
} else if (finalScore >= 700 && finalScore <= 799) {
  loanName =
    loanPurpose === "education"
      ? "EduFlex Loan"
      : loanPurpose === "business"
      ? "BizGrowth Loan"
      : "SmartEase Loan";
} else if (finalScore >= 800) {
  loanName =
    loanPurpose === "home"
      ? "PrimeHome Loan"
      : loanPurpose === "business"
      ? "EliteBiz Loan"
      : "MaxBoost Personal Loan";
} else {
  loanName = "Not Eligible";
  loanAmount = "-";
}

// Assign loan amount based on credit score range (₹2k – ₹30k)
if (loanName !== "Not Eligible") {
 const minAmount = 2000 + Math.round(((finalScore - 300) / (900 - 300)) * 10000); // lower bound
const maxAmount = minAmount + 2000 + Math.round(((finalScore - 300) / (900 - 300)) * 5000); // upper bound

loanAmount = `₹${minAmount.toLocaleString()} – ₹${maxAmount.toLocaleString()}`;



    } else if (finalScore >= 700 && finalScore <= 799) {
      loanName =
        loanPurpose === "education"
          ? "EduFlex Loan"
          : loanPurpose === "business"
          ? "BizGrowth Loan"
          : "SmartEase Loan";
      loanAmount = "₹20,000 – ₹50,000";
    } else if (finalScore >= 800) {
      loanName =
        loanPurpose === "home"
          ? "PrimeHome Loan"
          : loanPurpose === "business"
          ? "EliteBiz Loan"
          : "MaxBoost Personal Loan";
      loanAmount = "₹50,000 – ₹2,00,000";
    } else {
      loanName = "Not Eligible";
      loanAmount = "-";
    }

    setLoan({ name: loanName, amount: loanAmount });

    // Scroll to gauge
    setTimeout(() => {
      gaugeRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

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
       
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-8 px-6 relative">
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-amber-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10">
           
            
            <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                Loan Eligibility
              </span>
              <br />
              <span className="text-amber-400">Checker</span>
            </h2>
            
           
          </div>
        </section>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group relative bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-white/10 hover:border-amber-400/30 p-8 rounded-2xl transition-all duration-500 backdrop-blur-sm mb-8"
        >
          <div className="absolute inset-0 bg-black/50 rounded-2xl group-hover:bg-black/40 transition-colors duration-300"></div>
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Monthly Income (₹)", value: income, setter: setIncome, name: "income", type: "number" },
                  { label: "Existing EMIs (₹)", value: emi, setter: setEmi, name: "emi", type: "number" },
                  { label: "Credit History (Years)", value: creditHistory, setter: setCreditHistory, name: "creditHistory", type: "number" },
                  { label: "Active Loans", value: loansCount, setter: setLoansCount, name: "loansCount", type: "number" },
                  { label: "Savings (₹)", value: savings, setter: setSavings, name: "savings", type: "number" },
                ].map((field) => (
                  <div key={field.name} className="group">
                    <label className="block mb-3 text-amber-200 font-medium group-hover:text-amber-300 transition-colors duration-300">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="group">
                  <label className="block mb-3 text-amber-200 font-medium group-hover:text-amber-300 transition-colors duration-300">
                    Bills Paid On Time?
                  </label>
                  <select
                    value={billsOnTime ? "yes" : "no"}
                    onChange={(e) => setBillsOnTime(e.target.value === "yes")}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="yes" className="bg-slate-800">Yes</option>
                    <option value="no" className="bg-slate-800">No</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block mb-3 text-amber-200 font-medium group-hover:text-amber-300 transition-colors duration-300">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="salaried" className="bg-slate-800">Salaried</option>
                    <option value="self-employed" className="bg-slate-800">Self-Employed</option>
                    <option value="gig" className="bg-slate-800">Gig Worker</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block mb-3 text-amber-200 font-medium group-hover:text-amber-300 transition-colors duration-300">
                    Purpose of Loan
                  </label>
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="personal" className="bg-slate-800">Personal</option>
                    <option value="education" className="bg-slate-800">Education</option>
                    <option value="business" className="bg-slate-800">Business</option>
                    <option value="home" className="bg-slate-800">Home</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
                >
                  <span className="relative z-10">Check Eligibility</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Results Section */}
        {creditScore !== null && (
          <div ref={gaugeRef} className="space-y-8">
            {/* Credit Score Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="group relative bg-gradient-to-br from-slate-900/50 to-purple-900/30 border border-white/10 hover:border-amber-400/30 p-8 rounded-2xl transition-all duration-500 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-black/50 rounded-2xl group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="relative z-10">
                <CreditScoreGauge score={creditScore} />
              </div>
            </motion.div>

            {/* Loan Recommendation */}
            {loan && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl"></div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-amber-200">
                    Recommended Loan Product
                  </h3>
                  
                  <div className="bg-black/30 rounded-2xl p-8 border border-amber-500/30 backdrop-blur-sm max-w-md mx-auto">
                    <h4 className="text-3xl font-bold text-white mb-4 text-center">{loan.name}</h4>
                    <div className="space-y-3 text-center">
                      <p className="text-xl text-amber-300">Eligible Amount: {loan.amount}</p>
                      <p className="text-slate-300 capitalize">Loan Purpose: {loanPurpose}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="text-center p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="text-amber-300 text-sm font-semibold mb-1">Credit Score</div>
                      <div className="text-white text-xl font-bold">{creditScore}</div>
                    </div>
                    <div className="text-center p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="text-amber-300 text-sm font-semibold mb-1">Risk Level</div>
                      <div className="text-white text-xl font-bold">
                        {creditScore >= 800 ? 'Low' : creditScore >= 700 ? 'Medium' : 'High'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="text-amber-300 text-sm font-semibold mb-1">Approval Chance</div>
                      <div className="text-white text-xl font-bold">
                        {creditScore >= 800 ? '90%' : creditScore >= 700 ? '75%' : '50%'}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center mt-8">
                    <button className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25">
                      <span className="relative z-10">Apply for Loan</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
     
    </div>
  );
};

// --- Gauge Component ---
const CreditScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const zones = [
    { name: "Poor", range: [300, 599], color: COLORS[0] },
    { name: "Fair", range: [600, 699], color: COLORS[1] },
    { name: "Good", range: [700, 799], color: COLORS[2] },
    { name: "Excellent", range: [800, 900], color: COLORS[3] },
  ];
  const chartData = zones.map((z) => ({
    name: z.name,
    value: z.range[1] - z.range[0],
    color: z.color,
  }));
  const percentage = ((score - 300) / 600) * 180 - 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center w-full"
    >
      {/* Chart Container */}
      <div className="relative w-full h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ 
                marginTop: "10px", 
                fontSize: "0.85rem",
                color: "#cbd5e1"
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}
        <motion.div
          className="absolute left-1/2 bottom-[95px] w-1 h-24 bg-amber-400 origin-bottom rounded shadow-lg shadow-amber-400/20"
          style={{ transform: `rotate(${percentage}deg)` }}
          animate={{ rotate: percentage }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Score Display - Centered */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center w-full">
          <motion.h1
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-extrabold text-white mb-2"
          >
            {score}
          </motion.h1>
          <p className="text-lg text-slate-300 font-medium">out of 900</p>
        </div>
      </div>

      {/* Score Interpretation */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
          <span className={`w-3 h-3 rounded-full mr-2 ${
            score >= 800 ? 'bg-green-500' : 
            score >= 700 ? 'bg-yellow-500' : 
            score >= 600 ? 'bg-orange-500' : 'bg-red-500'
          }`}></span>
          <span className="text-amber-300 font-semibold">
            {score >= 800 ? 'Excellent Credit' : 
             score >= 700 ? 'Good Credit' : 
             score >= 600 ? 'Fair Credit' : 'Poor Credit'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanEligibility;