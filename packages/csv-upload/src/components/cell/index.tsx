import { FC } from "react"
import { useTable } from "../../context/tableContext";
import { Coords } from "../../utils/coordsType";

interface CellProps {
  coords: Coords
}


const Cell: FC<CellProps> = ({coords}) => {

  const {getCell, setInputCellCoords} = useTable()
  const onClick = () => setInputCellCoords(coords);
  
  
  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
      }}
      onClick={onClick}>
    {getCell(coords)}
    </td>
  )
}

export default Cell;