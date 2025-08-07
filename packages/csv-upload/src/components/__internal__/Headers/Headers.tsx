import { FC, ReactNode } from "react";
import useRow from "@hooks/useRow";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";
import { Column } from "@components/Table";
import { CSVCellCoords } from "types";
import useDisplayErrorBox from "@hooks/useDisplayErrorBox";
import { HeaderProvider } from "@contexts/HeaderProvider";
import { ReadableByteStreamController } from "node:stream/web";
import makeHeaderKey from "@utils/makeHeaderKey";

export interface RowProps {
  columns: Column[];
  shouldRender: boolean
}

const Headers: FC<RowProps> = ({ columns, shouldRender }) => {

  if (!shouldRender) return null;

  return (
    <tr>
      {columns.map((column, colIndex) => (
        <HeaderProvider key={makeHeaderKey(colIndex)} headerIndex={colIndex} >
          {column.renderHeader}
        </HeaderProvider>
      ))}
    </tr >
  );
};

export default Headers;
