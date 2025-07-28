import React, { FC, ReactNode } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import cellMap from "@utils/cellMap";
import { useCell } from "@contexts/CellProvider";

// export type CellProps = CSVCellData["props"] & {children?: ReactNode}
export interface CellProps{
  children: ReactNode
  classNames?: {
    root?: string
    rootError?:string
  }
}



const Cell: FC<CellProps> = ({children, classNames = {}}) => {
  const {type} = useCell(); 
  const RenderCell = cellMap[type]; 
  
                  
                    
  return (
    <RenderCell classNames={classNames}>
      {children}
    </RenderCell>
  )
}

export default Cell;


