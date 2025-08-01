import { CSVCellCoords } from "./coordsType"

export type CSVErrorType = "frontend" | "backend"
export interface CSVError { 
  coords: CSVCellCoords
  msg: string
  type: CSVErrorType
}
