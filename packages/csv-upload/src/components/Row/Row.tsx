import { FC, ReactNode } from "react";
import useRow from "@hooks/useRow";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";

export interface RowProps{
  className?: string
}

const Row: FC<RowProps> = ({className}) => {
  const { cellCoords, cellTemplate } = useRow();

  return (
    <tr className={className ?? ""}>
      {cellCoords.map((coords) => {
        const key = serializeCoords(coords);
        return (
          <CellProvider key={key} coords={coords}>
            {cellTemplate}
          </CellProvider>
        );
      })}
    </tr>
  );
};

export default Row;
