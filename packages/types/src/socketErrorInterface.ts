import { CSVError } from "./errorInterface";

export interface CSVSocketError {
  startIndex : number, 
  errors: CSVError[]
}