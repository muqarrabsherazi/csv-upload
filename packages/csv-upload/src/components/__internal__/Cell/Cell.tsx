import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { Coords } from "../../../../../types/src/types/coordsType";

interface CellProps {
  coords: Coords,
  value: string
}


const Cell: FC<CellProps> = ({coords, value}) => {

  const {setInputCellCoords} = useTable()
  const onClick = () => setInputCellCoords(coords);
  
  
  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
        maxWidth: "20px"
      }}
      onClick={onClick}>
    {value}
    </td>
  )
}

export default Cell;