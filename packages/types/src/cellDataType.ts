
import { Coords } from "./coordsType"


export type CSVCellType = "display" | "input"

export interface CSVCellData {
  props: {
    coords: Coords, 
    value: string, 
    errorMsg: string | null;
    type: CSVCellType
  } 

  key: string
}