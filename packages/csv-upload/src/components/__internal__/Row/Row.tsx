import { FC } from "react";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";
import { Column } from "@components/Table";
import useDisplayErrorBox from "@hooks/useDisplayErrorBox";

export interface RowProps {
  columns: Column[]; 
  rowIndex: number;
}

const Row: FC<RowProps> = ({columns, rowIndex}) => {

  const {shouldDisplayErrorBox} = useDisplayErrorBox();
  return (
    <tr>
      {columns.map((column, colIndex) => {
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
