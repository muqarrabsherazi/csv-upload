import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import { CellProps } from "@components/Cell";

export interface DisplayCellProps extends CellProps{}


const DisplayCell: FC<DisplayCellProps> = ({coords, value, errorMsg}) => {

  const {setInputCellCoords} = useTable()
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setInputCellCoords(coords)
  };
  
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

export default DisplayCell;