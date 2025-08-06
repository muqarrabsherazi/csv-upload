import { FC, ReactNode } from "react";
import useRow from "@hooks/useRow";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";

export interface RowProps{
  children: ReactNode
  className?: string
}

const Row: FC<RowProps> = ({children, className}) => {
  const { cellCoords } = useRow();

  return (
    <tr className={className ?? ""}>
      {cellCoords.map((coords) => {
        const key = serializeCoords(coords);
        return (
          <CellProvider key={key} coords={coords}>
            {children}
          </CellProvider>
        );
      })}
    </tr>
  );
};

export default Row;
