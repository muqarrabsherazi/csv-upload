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
import useTable from "@hooks/useTable";

export interface RowProps {
  renderHeader: ReactNode 
}

const Headers: FC<RowProps> = ({ renderHeader}) => {
  const {schema, headers} = useTable(); 

  if (!schema.headers) return null

  return (
    <tr>
      {headers.map((_, headerIndex) => (
        <HeaderProvider key={makeHeaderKey(headerIndex)} headerIndex={headerIndex} >
          {renderHeader}
        </HeaderProvider>
      ))}
    </tr >
  );
};

export default Headers;
