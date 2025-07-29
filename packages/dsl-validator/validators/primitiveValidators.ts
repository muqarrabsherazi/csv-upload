import { parse, isValid } from "date-fns";
export const isString = (value: string): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isNum = (value: string): boolean => {
  return /^-?\d+(\.\d+)?$/.test(value.trim());
};

export const isBool = (value: string): boolean => {
  const booleans = [
    "true", "false", "yes", "no", "y", "n",
  ]
  return booleans.some((b) => value.trim().toLowerCase() === b);
};

export const isDate = (value: string): boolean => {

const dateFormats = [
  "yyyy-MM-dd",       // 2021-07-21
  "dd-MM-yyyy",       // 21-07-2021
  "MM-dd-yyyy",       // 07-21-2021
  "yyyy/MM/dd",       // 2021/07/21
  "dd/MM/yyyy",       // 21/07/2021
  "MM/dd/yyyy",       // 07/21/2021
  "yyyy.MM.dd",       // 2021.07.21
  "dd MMMM yyyy",     // 21 July 2021
  "MMMM dd, yyyy",    // July 21, 2021
  "MMMM dd,yyyy",    // July 21,2021
  "MMM dd, yyyy",     // Jul 21, 2021
  "MMM dd,yyyy",     // Jul 21,2021
  "dd.MM.yyyy",       // 21.07.2021
  "dd MMM yyyy",      // 21 Jul 2021
];

  const trimmed = value.trim();

  const patternsMatch = dateFormats.some((format) => {
    const parsed = parse(trimmed, format, new Date());
    return isValid(parsed);

  })
  return patternsMatch;

}

