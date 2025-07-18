import {FC} from "react"
import { makeKey } from "../../utils/makeKey"

interface CellProps {
  row: number, 
  col: number, 
}

const Cell: FC<CellProps> = ({row, col}) => {
  return (
    <td key={makeKey(row, col)}>test value</td>
  )
}

export default Cell;