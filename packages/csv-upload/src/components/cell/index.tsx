import { FC } from "react"

interface CellProps {
  row: number,
  col: number,
}

const Cell: FC<CellProps> = ({ row, col }) => {

  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
      }}>
    test value
    </td>
  )
}

export default Cell;