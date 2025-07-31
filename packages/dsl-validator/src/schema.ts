/**
 * A minimal DSL to describe the structure of a CSV file.
 * Interns should expand this as the project grows.
 */

export type CSVPrimitiveType = "string" | "number" | "boolean" | "date";

type NonEmptyArray<T> = [T, ...T[]];
export type CSVDateFormat = 
  "yyyy-MM-dd" |
  "dd-MM-yyyy" |
  "MM-dd-yyyy" |
  "yyyy/MM/dd" |
  "dd/MM/yyyy" |
  "MM/dd/yyyy" |
  "yyyy.MM.dd" |
  "dd MMMM yyyy" |
  "MMMM dd, yyyy" |
  "MMMM dd,yyyy" |
  "MMM dd, yyyy" |
  "MMM dd,yyyy" |
  "dd.MM.yyyy" |
  "dd MMM yyyy"

export interface CSVFieldBasicSchema {
  name: string;
  type: CSVPrimitiveType;
  required?: boolean;
  validator?: (value: string) => string | null;
  errorMsg?: string
}

export interface CSVFieldDateSchema extends CSVFieldBasicSchema {
  type: "date"
  dateFormats: NonEmptyArray<CSVDateFormat>
}

export interface ConditionalNumberFieldSchema extends CSVFieldBasicSchema {
  condition: string // "<10", "===100"
}

export type CSVFieldSchema = CSVFieldBasicSchema | CSVFieldDateSchema

export interface CSVSchema {
  fields: CSVFieldSchema[];
}