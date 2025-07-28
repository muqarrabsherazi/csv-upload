import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import { CellProps } from "@components/Cell";
import  ErrorMessage  from "@components/ErrorMessage"
import serializeCoords from "@utils/serializeCoords";
import { useErrors } from "@contexts/ErrorProvider";
import { useCell } from "@contexts/CellProvider";


export interface DisplayCellProps extends CellProps{}


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

  const errorClassName = (errorMsg ? classNames?.rootError ?? "" : "")
  
 return (
    <td
      style={{
        border: errorMsg ? "1px solid red" : "1px solid black",
        padding: "8px",
        textAlign: "left",
        maxWidth: "20px",
        position: "relative",

      }}
      className={classNames?.root ?? "" + errorClassName}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

    >
      {value}
      {children}

    </td>
  );
};

export default DisplayCell;