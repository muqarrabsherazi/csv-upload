import { CSVCellCoords } from "types";
import useErrors from "./useErrors";
import useTable from "./useTable"
import coordsAreEqual from "@utils/coordsAreEqual";

const useDisplayErrorBox = () => {
  const { hoverCellCoords, inputCellCoords } = useTable();
  const { getError } = useErrors();

  const shouldDisplayErrorBox = (coords: CSVCellCoords) => {
    return getError(coords) != null &&
      (coordsAreEqual(hoverCellCoords, coords) || coordsAreEqual(inputCellCoords, coords))

  }
  return {shouldDisplayErrorBox}
}

export default useDisplayErrorBox; 
