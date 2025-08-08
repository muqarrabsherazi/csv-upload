

export type CSVCellCoords = {row: number, col: number}

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