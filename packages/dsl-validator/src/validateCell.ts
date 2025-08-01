import { CSVDateFormat, CSVFieldBasicSchema, CSVFieldSchema, CSVPrimitiveType } from "./schema"
import { isBool, isDate, isNum, isString } from "./primitiveValidators"
import { ErrorMsg } from "types"

export const validator: Record<CSVPrimitiveType, (value:string, field: CSVFieldSchema) => ErrorMsg> = {
  "string": isString, 
  "number": isNum,
  "boolean": isBool, 
  "date": isDate,  
}

export const checkRequired = (required: boolean | undefined, value: string) => required ? value.trim().length != 0 : true

export const validate = (field: CSVFieldSchema, value: string): string | null  => {
  if (field.validator != undefined) 
    return field.validator(value) 

  if (!field.required && !value)
    return null;
    
  const isNonEmpty = field.required? value.trim().length != 0 : true; 
  const errorMsg = validator[field.type](value, field)


  if (!isNonEmpty) return "Value should be non-empty"
  if (errorMsg != null) return errorMsg 
  return null; 
}