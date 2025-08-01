import { parse, isValid } from "date-fns";
import { CSVFieldBasicSchema, CSVFieldDateSchema, CSVFieldSchema } from "./schema";
import { ErrorMsg } from "types";

export const isString = (value: string, field: CSVFieldSchema): ErrorMsg => {
  if (typeof value != "string")
    return field.errorMsg ?? "Value should be of string type";
  return null;
};

export const isNum = (value: string, field: CSVFieldSchema): ErrorMsg => {
  if (Number.isNaN(Number(value)))
    return field.errorMsg ?? "Value should be a number type"
  return null;
};

export const isBool = (value: string, field: CSVFieldSchema): ErrorMsg => {
  const booleans = [
    "true", "false",
  ]
  if (!booleans.some((b) => value.toLowerCase() === b))
    return field.errorMsg ?? "Value should be of boolean type";
  return null
};

export const isDate = (value: string, field: CSVFieldSchema): ErrorMsg => {
  
  const dateField = field as CSVFieldDateSchema; 
  const valid =  dateField.dateFormats.some((format) => {
    const parsed = parse(value, format, new Date());
    return isValid(parsed);
  })

  if (!valid)
    return field.errorMsg ?? `Value should be of type date with format: ${dateField.dateFormats.map(f => `(${f})`).join(' , ')}`

  return null

}

