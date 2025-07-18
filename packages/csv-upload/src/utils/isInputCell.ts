import type { Coords } from "./coordsType";
const isInputCell = (inputCell: Coords | null, cellCoords: Coords): boolean => {
  if (inputCell == null) return false 
  return inputCell.row == cellCoords.row && inputCell.col == cellCoords.col; 
}
export default isInputCell; 