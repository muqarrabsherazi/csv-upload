import {FC} from "react"
import Cell from "../Cell"
import makeKey from "../../../utils/makeKey"
import InputCell from "../InputCell";
import isInputCell from "../../../utils/isInputCell";
import { useTable } from "../../../contexts/TableProvider";

interface RowProps {
  rowIndex: number, 
  row: string[]
}

const Row: FC<RowProps> = ({rowIndex, row}) => {
  
  const {inputCellCoords} = useTable(); 

  return (
    <tr>
      {row.map((value, colIndex) => isInputCell(inputCellCoords, {row: rowIndex, col: colIndex}) ? 
      (<InputCell key={makeKey(rowIndex, colIndex)} coords={{row:rowIndex, col:colIndex}} value={value}/>) :
      (<Cell key={makeKey(rowIndex, colIndex)} coords={{row:rowIndex, col:colIndex}} value={value}/>)
    )}
    </tr>
  )
}

export default Row;
