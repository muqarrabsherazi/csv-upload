import {FC} from "react"
import Cell from "../cell"
import makeKey from "../../utils/makeKey"
import InputCell from "../inputCell";
import isInputCell from "../../utils/isInputCell";
import { useTable } from "../../context/rowsContext";

interface RowProps {
  rowIndex: number, 
}

const Row: FC<RowProps> = ({rowIndex}) => {
  
  const {rows, inputCell} = useTable(); 

  return (
    <tr>
      {rows[rowIndex].map((_, colIndex) => isInputCell(inputCell, {row: rowIndex, col: colIndex}) ? 
      (<InputCell key={makeKey(rowIndex, colIndex)} coords={{row:rowIndex, col:colIndex}}/>) :
      (<Cell key={makeKey(rowIndex, colIndex)} coords={{row:rowIndex, col:colIndex}}/>)
    )}
    </tr>
  )
}

export default Row;
