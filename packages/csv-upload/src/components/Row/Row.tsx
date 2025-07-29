import { FC } from "react";
import { useRow } from "@contexts/RowProvider";
import { CellProvider } from "@contexts/CellProvider";
import Cell from "@components/Cell";
import serializeCoords from "@utils/serializeCoords";

export interface RowProps{}

const Row: FC<RowProps> = () => {
  const { cellCoords } = useRow();

  return (
    <tr>
      {cellCoords.map((coords) => {
        const key = serializeCoords(coords);
        return (
          <CellProvider key={key} coords={coords}>
            <Cell />
          </CellProvider>
        );
      })}
    </tr>
  );
};

export default Row;
