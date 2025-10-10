// src/components/FormCard.tsx
import React from "react";

interface Field {
  key: string;
  value: string;
  hint: string;
  required: boolean;
}

interface FormCardProps {
  fields: Field[];
  errors: (string | null)[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  handleCheckAll: () => void;
  isChecking: boolean;
}

const FormCard: React.FC<FormCardProps> = ({
  fields,
  errors,
  activeIndex,
  setActiveIndex,
  handleCheckAll,
  isChecking,
}) => {
  return (
    <div className="lg:w-1/2 w-full">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-amber-300">
            Field Status & Guidance
          </h3>
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Real-time validation</span>
          </div>
        </div>

        {/* Fields list */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {fields.map((field, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`p-4 rounded-xl border-2 duration-300 group cursor-default ${
                activeIndex === i
                  ? "border-blue-400 bg-slate-800/30 shadow-lg scale-105"
                  : errors[i]
                  ? "border-red-500 bg-red-900/20"
                  : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/20"
              }`}
            >
              {/* Field Header */}
              <div className="flex items-start justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-100">
                  {field.key}
                  {field.required && (
                    <span className="text-red-400 ml-1">*</span>
                  )}
                </label>

                {/* Status Badge */}
                {errors[i] ? (
                  <span className="text-xs bg-red-700/50 text-red-300 px-2 py-1 rounded-full">
                    Invalid
                  </span>
                ) : field.value ? (
                  <span className="text-xs bg-green-700/50 text-green-300 px-2 py-1 rounded-full">
                    Valid
                  </span>
                ) : (
                  <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                    Pending
                  </span>
                )}
              </div>

              {/* Hint text */}
              <p className="text-xs text-slate-300 flex items-center">
                <span className="mr-1">💡</span>
                {field.hint}
              </p>

              {/* Optional error message */}
              {errors[i] && (
                <p className="text-xs text-red-400 mt-2 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors[i]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-slate-700">
          <button
            onClick={handleCheckAll}
            disabled={isChecking}
            className="group relative w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Validating Fields...
                </>
              ) : (
                <>
                  Validate All Fields
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
