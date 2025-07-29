import { ReactNode } from "react";
import { FC } from "react";
import { useCell } from "@contexts/CellProvider";
import cellMap from "@utils/cellMap";

// export type CellProps = CSVCellData["props"] & {children?: ReactNode}
export interface CellProps{
  children?: ReactNode
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
