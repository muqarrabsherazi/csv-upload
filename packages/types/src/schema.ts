/**
 * A minimal DSL to describe the structure of a CSV file.
 * Interns should expand this as the project grows.
 */

export type CSVPrimitiveType = "string" | "number" | "boolean" | "date";

export interface CSVFieldSchema {
  /** Column name as it appears in the CSV header */
  name: string;
  /** Primitive data type */
  type: CSVPrimitiveType;
  /** Whether the column is mandatory */
  required?: boolean;
  /** Optional custom validator function */
  validator?: (value: string) => string | null;
  errorMsg?: string
}

export interface CSVSchema {
  /** Array of field definitions */
  fields: CSVFieldSchema[];
  headers?: boolean;
}

export interface ConditionalNumberFieldSchema extends CSVFieldSchema {
  condition: string // "<10", "===100"
}