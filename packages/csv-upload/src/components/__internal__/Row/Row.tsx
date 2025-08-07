import { FC } from "react";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";
import { ColumnInterface } from "@components/Table";
import useDisplayErrorBox from "@hooks/useDisplayErrorBox";
import useTable from "@hooks/useTable";

export interface RowProps {
  columns: ColumnInterface[]; 
  rowIndex: number;
  className?: string;
}

const Row: FC<RowProps> = ({columns, rowIndex, className}) => {

  const {shouldDisplayErrorBox} = useDisplayErrorBox();
  const {schema} = useTable();

  return (
    <tr className={className ?? ""}>
      {schema.fields.map((field, colIndex) => {
        const column =  columns.find(col => col.name == field.name);
        if (!column) throw Error(`Cannot find renderer for column ${field.name}`)

        const coords = { row: rowIndex, col: colIndex };
        const renderErrorBox = shouldDisplayErrorBox(coords) ? column.renderErrorBox : null;

        return (
          <CellProvider key={serializeCoords(coords)} coords={coords} renderErrorBox={renderErrorBox}>
            {column.renderCell}
          </CellProvider>
        )
      })}
    </tr>
  );
};

export default Row;
