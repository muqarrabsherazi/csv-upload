import { FC, ReactNode } from "react";
import useRow from "@hooks/useRow";
import { CellProvider } from "@contexts/CellProvider";
import serializeCoords from "@utils/serializeCoords";

export interface RowProps{
  children: ReactNode
  classNames?: {
    root?: string
  }
}

const Row: FC<RowProps> = ({children, classNames}) => {
  const { cellCoords } = useRow();

  return (
    <tr className={classNames?.root?? ""}>
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
