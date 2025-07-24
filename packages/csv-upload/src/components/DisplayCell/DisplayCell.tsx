import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import { CellProps } from "@components/Cell";
import  ErrorMessage  from "@components/ErrorMessage"
import serializeCoords from "@utils/serializeCoords";
import { useErrors } from "@contexts/ErrorProvider";


export interface DisplayCellProps extends CellProps{}


const DisplayCell: FC<DisplayCellProps> = ({ coords, value, children }) => {
  const { setInputCellCoords, setHoverCellCoords, resetHoverCellCoords } = useTable();
  const { errors } = useErrors();

  const key = serializeCoords(coords);
  const hasError = Boolean(errors[key]);
  
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
  
 return (
    <td
      style={{
        border: hasError ? "1px solid red" : "1px solid black",
        padding: "8px",
        textAlign: "left",
        maxWidth: "20px",
        position: "relative",

      }}
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