import { FC } from "react"
import { useTable } from "@contexts/TableProvider";
import { CSVCellData } from "types"
import { CellProps } from "@components/Cell";
import  ErrorMessage  from "@components/ErrorMessage"
import serializeCoords from "@utils/serializeCoords";
import { useErrors } from "@contexts/ErrorProvider";


export interface DisplayCellProps extends CellProps{}


const DisplayCell: FC<DisplayCellProps> = ({ coords, value }) => {
  const { setInputCellCoords } = useTable();
  const { errors } = useErrors();
  const { setHoverCellCoords } = useTable();

  const key = serializeCoords(coords);
  const hasError = Boolean(errors[key]);
  
  const onClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    setInputCellCoords(coords);
  };

  const onHover = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.stopPropagation();
    setHoverCellCoords(coords);
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
    >
      {value}
      {/*<ErrorMessage  cellData={ cellData}/>*/}
    </td>
  );
};

export default DisplayCell;