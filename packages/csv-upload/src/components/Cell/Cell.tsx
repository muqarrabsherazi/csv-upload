import { ReactNode } from "react";
import { FC } from "react";
import cellMap from "@utils/cellMap";
import useCell from "@hooks/useCell";

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
