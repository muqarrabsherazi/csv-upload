import { Children, FC, isValidElement, cloneElement } from "react";
import { ReactNode } from "react";
import useTable from "@hooks/useTable";
import useKeyPressOutside from "@hooks/useKeyPressOutside";
import Row from "@components/internal/Row";
import Headers from "@components/internal/Headers";

export interface ColumnInterface {
  name: string;
  renderHeader?: ReactNode
  renderCell: ReactNode
  renderErrorBox: ReactNode
}

export interface TableProps {
  children: ReactNode
  classNames?: {
    table?: string
    head?: string
    body?: string
    row?: string
  }
}

const Table: FC<TableProps> = ({classNames, children }) => {
  const { schema, rows, resetInputCellCoords } = useTable();
  useKeyPressOutside({ onMouseDown: resetInputCellCoords })


const columns: ColumnInterface[] = Children.toArray(children)
  .filter((child): child is React.ReactElement  =>
    isValidElement(child) &&
    typeof child.type === "function" &&
    child.type.name === "Column"
  )
  .map((col) => col.props)
  .slice(0, schema.fields.length);


  return (
    <table className={classNames?.table ?? ""}>
      <thead className={classNames?.head ?? ""}>
        <Headers columns={columns} shouldRender={schema.headers != undefined} />
      </thead>
      <tbody className={classNames?.body ?? ""}>
        {rows.map((_, rowIndex) => <Row key={rowIndex} rowIndex={rowIndex} columns={columns} className={classNames?.row ?? ""}/>)}
      </tbody>
    </table>
  );
};

export default Table;
