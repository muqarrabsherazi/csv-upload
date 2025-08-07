import { FC, ReactNode} from "react";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";
import useDisplayErrorBox from "@hooks/useDisplayErrorBox";
import useTable from "@hooks/useTable";

export interface RowProps {
  renderCell: ReactNode;
  renderErrorBox: ReactNode;
  rowIndex: number;
  className?: string;
}

const Row: FC<RowProps> = ({renderCell, renderErrorBox: renderErrorBoxTemplate, rowIndex, className}) => {
  const {getRow} = useTable()
  const row = getRow(rowIndex);

  const {shouldDisplayErrorBox} = useDisplayErrorBox();
  return (
    <tr className={className ?? ""}>
      {row.map((value, colIndex) => {
        const coords = { row: rowIndex, col: colIndex };
        const renderErrorBox = shouldDisplayErrorBox(coords) ? renderErrorBoxTemplate : null;
        return (
          <CellProvider key={serializeCoords(coords)} coords={coords} renderErrorBox={renderErrorBox}>
            {renderCell}
          </CellProvider>
        )
      })}
    </tr>
  );
};

export default Row;
