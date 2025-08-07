import { FC } from "react";
import { ReactNode } from "react";
import { RowProvider } from "@contexts/RowProvider";
import useTable from "@hooks/useTable";
import useKeyPressOutside from "@hooks/useKeyPressOutside";
import { CellProvider } from "@contexts/CellProvider";
import useDisplayErrorBox from "@hooks/useDisplayErrorBox";
import Row from "@components/Row";

export interface Column {
  name: string;
  renderCell: ReactNode
  renderErrorBox: ReactNode
}

export interface TableProps {
  headers?: ReactNode
  columns: Column[]
  classNames?: {
    table?: string
    head?: string
    body?: string
  }
}

const Table: FC<TableProps> = ({ headers, columns, classNames }) => {
  const { schema, rows, resetInputCellCoords } = useTable();
  useKeyPressOutside({ onMouseDown: resetInputCellCoords })

  return (
    <table className={classNames?.table ?? ""}>
      {
        schema.headers && headers &&
        <thead className={classNames?.head ?? ""}>
          {headers}
        </thead>
      }
      <tbody className={classNames?.body ?? ""}>
        {rows.map((_, rowIndex) => <Row key={rowIndex} rowIndex={rowIndex} columns={columns}/>)}
      </tbody>
    </table>
  );
};

export default Table;
