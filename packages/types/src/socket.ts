import { CSVError } from "./error"

export interface CSVSocketData {
  batchSize: number, 
  startIndex : number, 
  rows: string[][]
}

export interface CSVSocketError {
  startIndex : number, 
  errors: CSVError[]
}