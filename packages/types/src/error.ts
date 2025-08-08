import { CSVCellCoords } from "./cell"

export type CSVErrorType = "frontend" | "backend"
export interface CSVError { 
  coords: CSVCellCoords
  msg: string
  type: CSVErrorType
}
export type ErrorMsg = string | null