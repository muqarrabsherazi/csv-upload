import { FC } from "react";
import { ReactNode } from "react";
import useTable from "@hooks/useTable";
import useKeyPressOutside from "@hooks/useKeyPressOutside";
import Row from "@components/internal/Row";
import Headers from "@components/internal/Headers";
import { CSVCellCoords } from "types";

export interface Column {
  name: string;
  renderHeader?: ReactNode
  renderCell: ReactNode
  renderErrorBox: ReactNode
}

export interface Components {
  cell: ReactNode; 
  errorBox: ReactNode;
  header: ReactNode;
}

type ComponentsOverride = ((coords: CSVCellCoords) => Partial<Components>)[]

export interface TableProps {
  components: Components; 
  componentsOverride?: ComponentsOverride;
  classNames?: {
    table?: string
    head?: string
    body?: string
  }
}

const Table: FC<TableProps> = ({ components, classNames }) => {
  const { schema, rows, resetInputCellCoords } = useTable();
  useKeyPressOutside({ onMouseDown: resetInputCellCoords })

  return (
    <table className={classNames?.table ?? ""}>
      <thead className={classNames?.head ?? ""}>
        <Headers renderHeader={components.header}  />
      </thead>
      <tbody className={classNames?.body ?? ""}>
        {rows.map((_, rowIndex) => <Row 
          key={rowIndex} 
          rowIndex={rowIndex} 
          renderCell={components.cell} 
          renderErrorBox={components.errorBox} 
        />)}
      </tbody>
    </table>
  );
};

export default Table;
