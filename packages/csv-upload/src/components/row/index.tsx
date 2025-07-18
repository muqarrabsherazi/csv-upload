import {FC} from "react"
import { makeKey } from "../../utils/makeKey"
import Cell from "../cell"

interface RowProps {
  rowIndex: number, 
}

const Row: FC<RowProps> = ({rowIndex}) => {
  const testRow = ["hello1", "hello2", "hello3"];
  return (
    <tr key={rowIndex}>
      {testRow.map((row, colIndex) => (
        <Cell row={rowIndex} col={colIndex}/>  
      ))}
    </tr>
  )
}

export default Row;
