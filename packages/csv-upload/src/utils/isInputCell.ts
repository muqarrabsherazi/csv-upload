import type { CSVCellCoords } from "types/src/coordsType";
const isInputCell = (inputCell: CSVCellCoords | null, cellCoords: CSVCellCoords): boolean => {
  if (inputCell == null) return false 
  return inputCell.row == cellCoords.row && inputCell.col == cellCoords.col; 
}
export default isInputCell; 