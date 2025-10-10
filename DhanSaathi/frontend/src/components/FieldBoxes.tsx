// src/components/FieldBoxes.tsx
import React from "react";

interface KeyPoint { x: number; y: number; }

interface Field {
  key: string;
  value: string;
  keyBox?: KeyPoint[];
  // optional: other meta (hint, required) can exist but not required here
  hint?: string;
  required?: boolean;
}

interface FieldBoxesProps {
  fields: Field[];
  scale: number;
  errors: (string | null)[];
  activeIndex: number | null;
  handleChange: (index: number, value: string) => void;
  setActiveIndex: (index: number | null) => void;
}

export default function FieldBoxes({
  fields,
  scale,
  errors,
  activeIndex,
  handleChange,
  setActiveIndex,
}: FieldBoxesProps) {
  return (
    <>
      {fields.map((field, i) => {
        if (!field.keyBox) return null;

        const top = field.keyBox[0].y * scale + 20;
        const left = field.keyBox[0].x * scale + 20;
        const width = (field.keyBox[1].x - field.keyBox[0].x) * scale;
        const height = (field.keyBox[2].y - field.keyBox[0].y) * scale;

        return (
          <div 
            key={i} 
            className="absolute group cursor-text transition-all duration-300"
            style={{ top, left, width, height }}
          >
            {/* Background Glow Effect */}
            <div 
              className={`absolute inset-0 rounded-lg blur-md transition-all duration-300 ${ 
                activeIndex === i
                  ? "bg-blue-500/30"
                  : errors[i]
                  ? "bg-red-500/30"
                  : "bg-green-500/30"
              } ${activeIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
            />

            {/* Main Box */}
            <div
              className={`relative w-full h-full rounded-lg border-2 flex items-center px-2 backdrop-blur-sm transition-all duration-300 shadow-lg
                ${
                  activeIndex === i
                    ? "border-blue-400 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-blue-500/25"
                    : errors[i]
                    ? "border-red-400 bg-gradient-to-r from-red-500/20 to-pink-500/20 shadow-red-500/25"
                    : "border-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-green-500/25 group-hover:border-amber-400 group-hover:bg-gradient-to-r group-hover:from-amber-500/20 group-hover:to-orange-500/20"
                }`}
            >
              {/* Status Indicator */}
              <div 
                className={`absolute -top-1 -left-1 w-2 h-2 rounded-full border-2 border-white transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-blue-400 animate-pulse"
                    : errors[i]
                    ? "bg-red-400"
                    : "bg-green-400"
                }`}
              />

              {/* Input placed over the field area (fills the box) */}
              <input
                aria-label={`Field ${field.key}`}
                value={field.value}
                onChange={(e) => handleChange(i, e.target.value)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                placeholder={field.key}
                className={`w-full h-full bg-transparent border-none outline-none text-sm font-semibold truncate transition-all duration-300
                  ${activeIndex === i ? "text-blue-900" : errors[i] ? "text-red-900" : "text-green-900 group-hover:text-amber-900"}
                  px-2 py-1`}
              />

              {/* Field Label (Hover) */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                  {field.key}
                  {errors[i] && <span className="ml-1 text-red-300">⚠️</span>}
                </div>
                <div className="w-2 h-2 bg-slate-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>

              {/* Error Badge */}
              {errors[i] && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg border border-white">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
              )}
            </div>

            {/* Connection Line (for active field) */}
            {activeIndex === i && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                {/* keep empty for now; you can plug in an arrow connector if needed */}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
