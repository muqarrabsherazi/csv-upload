export const isString = (value: string): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isNum = (value: string): boolean => {
  return /^-?\d+(\.\d+)?$/.test(value.trim());
};

export const isBool = (value: string): boolean => {
  return /^(true|false)$/i.test(value.trim());
};

export const isDate = (value: string): boolean => {
  const trimmed = value.trim();

  // Common date format patterns
  const patterns = [
    /^\d{4}-\d{2}-\d{2}$/,              // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/,            // MM/DD/YYYY or DD/MM/YYYY (ambiguous)
    /^\d{2}-\d{2}-\d{4}$/,              // MM-DD-YYYY or DD-MM-YYYY (ambiguous)
    /^\d{4}\/\d{2}\/\d{2}$/,            // YYYY/MM/DD
    /^\d{2} [a-zA-Z]+ \d{4}$/,          // DD Month YYYY
    /^[a-zA-Z]+ \d{2}, \d{4}$/,         // Month DD, YYYY
    /^\d{4}\.\d{2}\.\d{2}$/,            // YYYY.MM.DD
  ];

  const matchesPattern = patterns.some((regex) => regex.test(trimmed));
  if (!matchesPattern) return false;

  const timestamp = Date.parse(trimmed);
  return !isNaN(timestamp);
};
