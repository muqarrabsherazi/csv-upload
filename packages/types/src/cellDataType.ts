
import { CSVCellCoords } from "./coordsType"


export type CSVCellType = "display" | "input"

export interface CSVCellData {
  props: {
    coords: CSVCellCoords, 
    value: string, 
    errorMsg: string | null;
    type: CSVCellType
  } 

  key: string
}