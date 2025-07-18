import {FC} from "react"
import Cell from "../cell"
import makeKey from "../../utils/makeKey"
import InputCell from "../inputCell";

interface RowProps {
  rowIndex: number, 
}

const Row: FC<RowProps> = ({rowIndex}) => {
  const testRow = ["hello1", "hello2", "hello3"];
  const isInputCell = (row: number, col: number): boolean => row == 1 && col == 1
  
  return (
    <tr>
      {testRow.map((_, colIndex) => isInputCell(rowIndex, colIndex) ? 
      (<InputCell key={makeKey(rowIndex, colIndex)} row={rowIndex} col={colIndex}/>) :
      (<Cell key={makeKey(rowIndex, colIndex)} row={rowIndex} col={colIndex}/>)
    )}
    </tr>
  )
}

export default Row;
