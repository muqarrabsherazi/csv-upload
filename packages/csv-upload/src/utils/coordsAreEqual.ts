import type { CSVCellCoords } from "types/src/coordsType";
const coordsAreEqual = (providerCoords: CSVCellCoords | null, cellCoords: CSVCellCoords): boolean => {
  if (providerCoords == null) return false 
  return providerCoords.row == cellCoords.row && providerCoords.col == cellCoords.col; 
}
export default coordsAreEqual; 