import { FC } from "react"
import { useTable } from "../../context/rowsContext";
import { Coords } from "../../utils/coordsType";

interface CellProps {
  coords: Coords
}


const Cell: FC<CellProps> = ({coords}) => {

  const {getCell} = useTable()
  
  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
      }}>
    {getCell(coords)}
    </td>
  )
}

export default Cell;