import { FC } from "react"
import Cell from "../Cell"
import serializeCoords from "../../../utils/makeKey"
import InputCell from "../InputCell";
import isInputCell from "../../../utils/isInputCell";
import { useTable } from "../../../contexts/TableProvider";
import { useErrors } from "@contexts/ErrorProvider";

interface RowProps {
  rowIndex: number,
  row: string[]
}

const Row: FC<RowProps> = ({ rowIndex, row }) => {

  const { inputCellCoords } = useTable();
  const {errors} = useErrors();

  return (
    <tr>
      {row.map((value, colIndex) => {
        const coords = { row: rowIndex, col: colIndex };
        const errorMsg =  errors[serializeCoords(coords)] || null;
        return isInputCell(inputCellCoords, coords) ?
          (<InputCell key={serializeCoords(coords)} coords={coords} value={value} errorMsg={errorMsg}/>) :
          (<Cell key={serializeCoords(coords)} coords={coords} value={value} errorMsg={errorMsg}/>)
      })}
    </tr>
  )
}

export default Row;
