import { FC } from "react";
import { ReactNode } from "react";
import useTable from "@hooks/useTable";
import useKeyPressOutside from "@hooks/useKeyPressOutside";
import Row from "@components/internal/Row";
import Headers from "@components/internal/Headers";

export interface Column {
  name: string;
  renderHeader?: ReactNode
  renderCell: ReactNode
  renderErrorBox: ReactNode
}

export interface TableProps {
  columns: Column[]
  classNames?: {
    table?: string
    head?: string
    body?: string
  }
}

const Table: FC<TableProps> = ({ columns, classNames }) => {
  const { schema, rows, resetInputCellCoords } = useTable();
  if (rows.length == 0) return null

  useKeyPressOutside({ onMouseDown: resetInputCellCoords })

  return (
    <table className={classNames?.table ?? ""}>
      <thead className={classNames?.head ?? ""}>
        <Headers columns={columns} shouldRender={schema.headers != undefined} />
      </thead>
      <tbody className={classNames?.body ?? ""}>
        {rows.map((_, rowIndex) => <Row key={rowIndex} rowIndex={rowIndex} columns={columns} />)}
      </tbody>
    </table>
  );
};

export default Table;
