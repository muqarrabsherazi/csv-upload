import { CSVPrimitiveType } from "types"
import { isBool, isDate, isNum, isString } from "./primitiveValidators"

export const validator: Record<CSVPrimitiveType, (value:string) => boolean> = {
  "string": isString, 
  "number": isNum,
  "boolean": isBool, 
  "date": isDate,  
}

