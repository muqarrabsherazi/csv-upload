import { CSVFieldSchema, CSVPrimitiveType } from "types"
import { isBool, isDate, isNum, isString } from "./primitiveValidators"

export const validator: Record<CSVPrimitiveType, (value:string) => boolean> = {
  "string": isString, 
  "number": isNum,
  "boolean": isBool, 
  "date": isDate,  
}

export const checkRequired = (required: boolean | undefined, value: string) => required ? value.trim().length != 0 : true

export const validate = (field: CSVFieldSchema, value: string): string | null  => {
  if (!("required" in field) && !field.required && value.trim().length == 0)
    return null;
    
  const isNonEmpty = field.required? value.trim().length != 0 : true; 
  const isValid = validator[field.type](value) && isNonEmpty

  if (!isNonEmpty) return "Value should be non-empty"
  if (!isValid) return `Value should be of type ${field.type}`
  return null; 
}