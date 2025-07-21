import { FC } from "react"
import Cell from "../Cell"
import serializeCoords from "../../../utils/makeKey"
import InputCell from "../InputCell";
import isInputCell from "../../../utils/isInputCell";
import { useTable } from "../../../contexts/TableProvider";

interface RowProps {
  rowIndex: number,
  row: string[]
}

const Row: FC<RowProps> = ({ rowIndex, row }) => {

  const { inputCellCoords } = useTable();

  return (
    <tr>
      {row.map((value, colIndex) => {
        const coords = { row: rowIndex, col: colIndex };
        return isInputCell(inputCellCoords, coords) ?
          (<InputCell key={serializeCoords(coords)} coords={coords} value={value} />) :
          (<Cell key={serializeCoords(coords)} coords={coords} value={value} />)
      })}
    </tr>
  )
}

export default Row;
