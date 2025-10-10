// src/pages/SchemeChecker.tsx
import React, { useState } from "react";
import schemes from "../data/schemes.json";

interface Scheme {
  id: string;
  name: string;
  description: string;
  url?: string;
  eligibility?: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    gender?: string[];
    occupation?: string[];
    category?: string[];
    states?: string[];
    bplOnly?: boolean;
  };
}

const SchemeChecker: React.FC = () => {
  const [form, setForm] = useState({
    age: "",
    income: "",
    gender: "male",
    occupation: "student",
    category: "general",
    state: "Karnataka",
    bpl: "no",
  });

  const [results, setResults] = useState<
    { scheme: Scheme; eligible: boolean; reason: string }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userAge = parseInt(form.age, 10);
    const userIncome = parseInt(form.income, 10);

    const checked = schemes.map((scheme: Scheme) => {
      const rules = scheme.eligibility;
      let eligible = true;
      let reason = "Eligible ✅";

      if (rules?.minAge && userAge < rules.minAge) {
        eligible = false;
        reason = `Age must be at least ${rules.minAge}`;
      } else if (rules?.maxAge && userAge > rules.maxAge) {
        eligible = false;
        reason = `Age must be below ${rules.maxAge}`;
      } else if (rules?.maxIncome && userIncome > rules.maxIncome) {
        eligible = false;
        reason = `Income must be ≤ ₹${rules.maxIncome}`;
      } else if (rules?.gender && !rules.gender.includes(form.gender)) {
        eligible = false;
        reason = `Only for: ${rules.gender.join(", ")}`;
      } else if (rules?.occupation && !rules.occupation.includes(form.occupation)) {
        eligible = false;
        reason = `Only for: ${rules.occupation.join(", ")}`;
      } else if (rules?.category && !rules.category.includes(form.category)) {
        eligible = false;
        reason = `Only for: ${rules.category.join(", ")}`;
      } else if (rules?.states && !rules.states.includes(form.state)) {
        eligible = false;
        reason = `Only for residents of ${rules.states.join(", ")}`;
      } else if (rules?.bplOnly && form.bpl !== "yes") {
        eligible = false;
        reason = "Only for BPL families";
      }

      return { scheme, eligible, reason };
    });

    setResults(checked);
  };

  // Filter eligible schemes
  const eligibleSchemes = results.filter((r) => r.eligible);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black/30 backdrop-blur-xl border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            DhanSaathi
          </h1>
        </div>
       
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-6 py-12">
        <div className="bg-slate-900/50 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 w-full max-w-4xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-6">
            Scheme Eligibility Checker 
          </h2>

         <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      {
        label: "Age",
        name: "age",
        type: "number",
        placeholder: "Enter your age",
      },
      {
        label: "Annual Income (₹)",
        name: "income",
        type: "number",
        placeholder: "Enter your annual income",
      },
    ].map((f) => (
      <div key={f.name}>
        <label className="block mb-1 font-medium text-slate-300">
          {f.label}
        </label>
        <input
          type={f.type}
          name={f.name}
          value={(form as Record<string, string | number>)[f.name]}
          onChange={handleChange}
          placeholder={f.placeholder}
          required
          className="w-full p-2 bg-slate-800/50 border border-slate-700 rounded text-white focus:outline-none focus:border-amber-400"
        />
      </div>
    ))}

    {/* Select Fields */}
    <div>
      <label className="block mb-1 font-medium text-slate-300">Gender</label>
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full p-2 bg-slate-800/100 border border-slate-700 rounded text-white"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium text-slate-300">
        Occupation
      </label>
      <select
        name="occupation"
        value={form.occupation}
        onChange={handleChange}
        className="w-full p-2 bg-slate-800/100 border border-slate-700 rounded text-white"
      >
        <option value="student">Student</option>
        <option value="farmer">Farmer</option>
        <option value="salaried">Salaried</option>
        <option value="self-employed">Self-Employed</option>
        <option value="entrepreneur">Entrepreneur</option>
        <option value="gig">Gig Worker</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium text-slate-300">Category</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 bg-slate-800/100 border border-slate-700 rounded text-white"
      >
        <option value="general">General</option>
        <option value="obc">OBC</option>
        <option value="sc">SC</option>
        <option value="st">ST</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium text-slate-300">State</label>
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        className="w-full p-2 bg-slate-800/100 border border-slate-700 rounded text-white"
      >
        <option value="Karnataka">Karnataka</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Kerala">Kerala</option>
        <option value="Delhi">Delhi</option>
        <option value="Gujarat">Gujarat</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium text-slate-300">
        Below Poverty Line (BPL)
      </label>
      <select
        name="bpl"
        value={form.bpl}
        onChange={handleChange}
        className="w-full p-2 bg-slate-800/100 border border-slate-700 rounded text-white"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  </div>

  {/* Centered Submit Button */}
  <div className="flex justify-center mt-6">
    <button
      type="submit"
      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
        px-10 py-4 rounded-xl font-semibold text-white transition-all duration-300 
        transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
    >
      Check Eligibility
    </button>
  </div>
</form>


          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-amber-300 text-center">
                Eligibility Results
              </h3>

              {eligibleSchemes.length > 0 ? (
                <ul className="space-y-3">
                  {eligibleSchemes.map((r) => (
                    <li key={r.scheme.id} className="p-4 rounded-lg border bg-green-900/30 border-green-500/40 transition">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <strong className="text-lg text-amber-200">{r.scheme.name}</strong>
                          <p className="text-slate-300 text-sm">{r.scheme.description}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <a
                            href={r.scheme.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 font-medium hover:text-green-300"
                          >
                            Eligible — Apply Now →
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-slate-400 text-lg mt-6">
                  😕 No schemes match your eligibility criteria right now.
                  <br />
                  Try adjusting your details or check back later.
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default SchemeChecker;
