import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { Coords } from "../../../../../types/src/types/coordsType";

interface CellProps {
  coords: Coords,
  value: string
  errorMsg: string | null 
}


const Cell: FC<CellProps> = ({coords, value, errorMsg}) => {

  const {setInputCellCoords} = useTable()
  const onClick = () => setInputCellCoords(coords);
  
  const errorStyle = errorMsg == null ? {} : {border: "1px solid red"}
  
  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
        maxWidth: "20px", 
        ...errorStyle
      }}
      onClick={onClick}>
    {value}
    </td>
  )
}

export default Cell;