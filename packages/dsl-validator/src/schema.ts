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

// 2. Non-date fields (excludes "date" type)
export interface CSVFieldBasicSchema extends CSVFieldBase {
  type: Exclude<CSVPrimitiveType, "date">; // "string" | "number" | "boolean"
}

// 3. Date fields (requires dateFormats)
export interface CSVFieldDateSchema extends CSVFieldBase {
  type: "date";
  dateFormats: NonEmptyArray<CSVDateFormat>; // Required
}

// 4. Discriminated union
export type CSVFieldSchema = 
  | CSVFieldBasicSchema 
  | CSVFieldDateSchema;

export interface CSVSchema {
  fields: CSVFieldSchema[];
}