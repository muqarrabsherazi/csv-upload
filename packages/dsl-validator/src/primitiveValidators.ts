import { parse, isValid } from "date-fns";
import { CSVFieldBasicSchema, CSVFieldDateSchema, CSVFieldSchema } from "./schema";
export const isString = (value: string): boolean => {
  return typeof value === "string"
};

export const isNum = (value: string, field: CSVFieldBasicSchema): boolean => {
  return !Number.isNaN(Number(value))
};

export const isBool = (value: string, field: CSVFieldBasicSchema): boolean => {
  const booleans = [
    "true", "false",
  ]
  return booleans.some((b) => value.toLowerCase() === b);
};

export const isDate = (value: string, field: CSVFieldSchema): boolean => {
  if (field.type != "date") return false
  
  const dateField = field as CSVFieldDateSchema; 
  return dateField.dateFormats.some((format) => {
    const parsed = parse(value, format, new Date());
    return isValid(parsed);

  })
}

