// validation.ts

interface Field {
  key: string;
  value: string;
  required?: boolean;
  pattern?: string;
  patternMessage?: string;
  min?: number;
  type?: string;
}

export function validateField(field: Field): string | null {
  const { key, value, required, pattern, patternMessage, min, type } = field;

  if (required && !value) return `Please enter ${key}`;

  if (pattern) {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) return patternMessage || `${key} is invalid`;
  }

  if (type === "number" && value) {
    const num = Number(value);
    if (isNaN(num)) return patternMessage || `${key} should be a number`;
    if (min !== undefined && num < min) return patternMessage || `${key} should be at least ${min}`;
  }

  return null; // ✅ Valid
}

// Validate all fields
export function validateAllFields(fields: Field[]): (string | null)[] {
  return fields.map(validateField);
}
