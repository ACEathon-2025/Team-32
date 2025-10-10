// src/components/FormHelper.tsx
import React, { useState, useRef, useEffect } from "react";
import fieldsData from "./fields.json";
import { validateField, validateAllFields } from "./validation";
import FieldBoxes from "../components/FieldBoxes";
import ArrowIndicator from "../components/ArrowIndicator";
import { toast } from "sonner";
import FormCard from "../components/FormCard";

interface Field {
  key: string;
  value: string;
  hint: string;
  type: string;
  required: boolean;
  pattern?: string;
  patternMessage?: string;
  min?: number;
  keyBox?: { x: number; y: number }[];
}

export default function FormHelper() {
  const [fields, setFields] = useState<Field[]>(fieldsData as Field[]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<(string | null)[]>(
    Array(fieldsData.length).fill(null)
  );
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Auto-update scale on resize
  useEffect(() => {
    const updateScale = () => {
      if (imgRef.current) {
        const naturalWidth = imgRef.current.naturalWidth;
        const displayedWidth = imgRef.current.clientWidth;
        setScale(displayedWidth / naturalWidth);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [imageSrc]);

  // Update field value and run single-field validation
  const handleChange = (i: number, value: string) => {
    const newFields = [...fields];
    newFields[i].value = value;
    setFields(newFields);

    const errorMsg = validateField(newFields[i]);
    const newErrors = [...errors];
    newErrors[i] = errorMsg;
    setErrors(newErrors);
  };

  // Validate all fields
  const handleCheckAll = async () => {
    setIsChecking(true);
    const newErrors = validateAllFields(fields);
    setErrors(newErrors);

    await new Promise((resolve) => setTimeout(resolve, 800));

   if (newErrors.every((err) => err === null)) {
  toast.success(" All fields are correctly filled!", {
    style: { backgroundColor: "#1E293B", color: "#1edb17ff", textAlign: "center" },
  });
} else {
  toast.error(" Some fields need your attention. Check the right panel.", {
    style: { backgroundColor: "#1F2937", color: "#F87171" },
  });
}


    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent">
                Form Assistant
              </h1>
            </div>
            <p className="text-slate-400 text-sm">
              AI-powered form filling with real-time guidance
            </p>
          </div>
        </div>

        {/* Upload prompt */}
        {!imageSrc && (
          <div className="flex flex-col items-center justify-center p-12 rounded-2xl mb-8 shadow-xl bg-slate-900/70 backdrop-blur-md border border-slate-700 transition-all duration-300 hover:shadow-2xl">
            <div className="text-5xl mb-4 text-amber-400">📄</div>
            <p className="text-2xl font-semibold text-slate-100 mb-3 text-center">
              Upload Your Document
            </p>
            <p className="text-slate-300 text-center mb-6 max-w-md">
              Upload a clear image of your form to get started with AI-assisted filling
            </p>
            <label className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Image + form panel */}
        {imageSrc && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Document Preview with inputs */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Document Preview</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    {fields.length} fields detected
                  </div>
                </div>
                <div className="relative p-4">
                  <img
                    src={imageSrc}
                    alt="Uploaded Document"
                    className="w-full block rounded-lg shadow-sm"
                    ref={imgRef}
                  />

                  {/* Field Boxes with inputs */}
                  <FieldBoxes
                    fields={fields}
                    scale={scale}
                    errors={errors}
                    activeIndex={activeIndex}
                    handleChange={handleChange}
                    setActiveIndex={setActiveIndex}
                  />

                  {/* Arrow pointing to active field (optional) */}
                  {activeIndex !== null && (
                    <ArrowIndicator field={fields[activeIndex]} scale={scale} />
                  )}
                </div>
              </div>
            </div>

            {/* Right-side status panel */}
            <FormCard
              fields={fields}
              errors={errors}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              handleCheckAll={handleCheckAll}
              isChecking={isChecking}
            />
          </div>
        )}
      </div>
    </div>
  );
}
