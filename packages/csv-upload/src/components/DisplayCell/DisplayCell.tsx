import { FC, useEffect } from "react"
import useTable from "@hooks/useTable";
import { CellProps } from "@components/Cell";
import useCell from "@hooks/useCell";


export interface DisplayCellProps extends CellProps{
  classNames: {
    root?: string, 
    rootError?: string
    text?: string
    textError?: string
  }
}


const DisplayCell: FC<DisplayCellProps> = ({children, classNames}) => {
  const {value, coords, errorMsg} = useCell(); 
  const { setInputCellCoords, setHoverCellCoords, resetHoverCellCoords } = useTable();
  
  const onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    setInputCellCoords(coords);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    setHoverCellCoords(coords);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    resetHoverCellCoords(); 
  };

  const errorRootClassName = (errorMsg ? classNames?.rootError ?? "" : "")
  const errorTextClassName = (errorMsg ? classNames?.textError ?? "" : "")
  
 return (
    <td
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={(classNames?.root??"") + " " + errorRootClassName}

    >
      <p className={(classNames?.text??"") + " " + errorRootClassName}>{value}</p>
      {children}

    </td>
  );
};

export default DisplayCell;