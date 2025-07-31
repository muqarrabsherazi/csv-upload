import { CSVDateFormats, CSVFieldBasicSchema, CSVFieldSchema, CSVPrimitiveType } from "./schema"
import { isBool, isDate, isNum, isString } from "./primitiveValidators"


export const validator: Record<CSVPrimitiveType, (value:string, field: CSVFieldSchema) => boolean> = {
  "string": isString, 
  "number": isNum,
  "boolean": isBool, 
  "date": isDate,  
}

export const checkRequired = (required: boolean | undefined, value: string) => required ? value.trim().length != 0 : true

export const validate = (field: CSVFieldBasicSchema, value: string): string | null  => {
  if (field.validator != undefined) 
    return field.validator(value) 

  if (!field.required && !value)
    return null;
    
  const isNonEmpty = field.required? value.trim().length != 0 : true; 
  const isValid = validator[field.type](value, field)


  if (!isNonEmpty) return "Value should be non-empty"
  if (!isValid) return field.errorMsg ?? `Value should be of type ${field.type}`
  return null; 
}