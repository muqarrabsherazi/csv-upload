import { ReactNode } from "react";
import { FC } from "react";
import cellMap from "@utils/cellMap";
import useCell from "@hooks/useCell";
import useRow from "@hooks/useRow";

export interface CellProps{
  children?: ReactNode
  classNames?: {
    cell?: string
    errorCell?:string
    text?: string
    errorText?:string
    input?: string
    errorInput?: string
  }
}


const Cell: FC<CellProps> = ({children, classNames = {}}) => {
  const {type} = useCell(); 
  const {errorBoxTemplate} = useRow();
  const RenderCell = cellMap[type]; 
                 
  return (
    <RenderCell classNames={classNames}>
      {children}
      {errorBoxTemplate}
    </RenderCell>
  )
}

export default Cell;
