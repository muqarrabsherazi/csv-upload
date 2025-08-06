import { FC } from "react";
import { ReactNode } from "react";
import { RowProvider } from "@contexts/RowProvider";
import useTable from "@hooks/useTable";

export interface TableProps {
  headers?: ReactNode
  template: {
    row: ReactNode
    cell: ReactNode
    errorBox: ReactNode
  }
  classNames?: {
    table?: string 
    head?: string
    body?: string
  }
}

const Table: FC <TableProps> = ({ headers, template, classNames}) => {
  const { schema, rows,  resetInputCellCoords} = useTable(); 

  // useKeyPressOutside({onMouseDown: resetInputCellCoords})


  return (
    <table className={classNames?.table?? ""}>
      {
        schema.headers && headers &&
        <thead className={classNames?.head?? ""}>
          {headers}
        </thead>
      }
      <tbody className={classNames?.body?? ""}>
        {rows.map((row, rowIndex) => (
          <RowProvider key={rowIndex} rowIndex={rowIndex} row={row} cellTemplate={template.cell} errorBoxTemplate={template.errorBox}>
            {template.row}
          </RowProvider>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
