import React, { FC, ReactNode } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import cellMap from "@utils/cellMap";

export type CellProps = CSVCellData["props"] & {children?: ReactNode}


const Cell: FC<CellProps> = ({coords, value, errorMsg, type, children}) => {
  const RenderCell = cellMap[type]; 
  const props = {coords, value, errorMsg, type, children}; 
  const {setHoverCellCoords} = useTable();
  
                  

                    
  return (
      <RenderCell {...props}/>

  )
}

export default Cell;


