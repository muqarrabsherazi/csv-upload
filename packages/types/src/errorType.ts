import { CSVCellCoords } from "./coordsType"

export interface CSVError { 
  coords: CSVCellCoords
  msg: string
}
