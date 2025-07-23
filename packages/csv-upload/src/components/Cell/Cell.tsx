import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import cellMap from "@utils/cellMap";

export type CellProps = CSVCellData["props"] 


const Cell: FC<CellProps> = ({coords, value, errorMsg, type}) => {
  const RenderCell = cellMap[type]; 
  const props = {coords, value, errorMsg, type}; 
  return (<RenderCell {...props}/>)
}

export default Cell;