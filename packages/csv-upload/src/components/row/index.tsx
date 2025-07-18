import {FC} from "react"
import Cell from "../cell"
import makeKey from "../../utils/makeKey"

interface RowProps {
  rowIndex: number, 
}

const Row: FC<RowProps> = ({rowIndex}) => {
  const testRow = ["hello1", "hello2", "hello3"];
  return (
    <tr>
      {testRow.map((row, colIndex) => (
        <Cell key={makeKey(rowIndex, colIndex)} row={rowIndex} col={colIndex}/>  
      ))}
    </tr>
  )
}

export default Row;
