export type CSVPrimitiveType = "string" | "number" | "boolean" | "date";

type NonEmptyArray<T> = [T, ...T[]];
export type CSVDateFormat = 
  "yyyy-MM-dd" | "dd-MM-yyyy" | "MM-dd-yyyy" |
  "yyyy/MM/dd" | "dd/MM/yyyy" | "MM/dd/yyyy" |
  "yyyy.MM.dd" | "dd MMMM yyyy" | "MMMM dd, yyyy" |
  "MMMM dd,yyyy" | "MMM dd, yyyy" | "MMM dd,yyyy" |
  "dd.MM.yyyy" | "dd MMM yyyy";

interface CSVFieldBase {
  name: string;
  required?: boolean;
  validator?: (value: string) => string | null;
  errorMsg?: string;
}

// export interface CSVFieldBasicSchema extends CSVFieldBase {
//   type: Exclude<CSVPrimitiveType, "date">; // "string" | "number" | "boolean"
// }

export interface CSVFieldStringSchema extends CSVFieldBase {
  type: "string"; 
  options?: string[];
}

export interface CSVFieldNumberSchema extends CSVFieldBase {
  type: "number"; 
}

export interface CSVFieldBooleanSchema extends CSVFieldBase {
  type: "boolean"; 
}

export interface CSVFieldDateSchema extends CSVFieldBase {
  type: "date";
  dateFormats: NonEmptyArray<CSVDateFormat>; // Required
}

export type CSVFieldSchema = 
  // | CSVFieldBasicSchema 
  | CSVFieldDateSchema 
  | CSVFieldStringSchema
  | CSVFieldNumberSchema
  | CSVFieldBooleanSchema


export interface CSVSchema {
  fields: CSVFieldSchema[];
}