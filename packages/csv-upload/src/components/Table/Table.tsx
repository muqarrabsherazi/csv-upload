import { FC } from "react";
import { ReactNode } from "react";
import { RowProvider } from "@contexts/RowProvider";
import useTable from "@hooks/useTable";
import useKeyPressOutside from "@hooks/useKeyPressOutside";

export interface TableProps {
  headers: ReactNode
  children: ReactNode;
  classNames?: {
    root?: string 
    head?: string
    body?: string
  }
}

const Table: FC <TableProps> = ({ headers, children, classNames}) => {
  const { rows, inputCellRef, resetInputCellCoords} = useTable(); 

  useKeyPressOutside({onMouseDown: resetInputCellCoords})

  return (
    <table style={{
      width:"100%"
    }}
      className={classNames?.root?? ""}
    >
      <thead className={classNames?.head?? ""}>
        {headers}
      </thead>
      <tbody className={classNames?.body?? ""}>
        {rows.map((row, rowIndex) => (
          <RowProvider key={rowIndex} rowIndex={rowIndex} row={row}>
            {children}
          </RowProvider>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
