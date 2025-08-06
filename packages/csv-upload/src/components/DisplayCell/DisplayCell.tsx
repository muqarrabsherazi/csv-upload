import { FC } from "react"
import useTable from "@hooks/useTable";
import { CellProps } from "@components/Cell";
import useCell from "@hooks/useCell";


export interface DisplayCellProps extends CellProps{
  classNames: {
    cell?: string, 
    errorCell?: string
    text?: string
    errorText?: string
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

  const errorRootClassName = (errorMsg ? classNames?.errorCell ?? "" : "")
  const errorTextClassName = (errorMsg ? classNames?.errorText ?? "" : "")
  
 return (
    <td
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={(classNames?.cell??"") + " " + errorRootClassName}

    >
      <p className={(classNames?.text??"") + " " + errorTextClassName}>{value}</p>
      {children}

    </td>
  );
};

export default DisplayCell;