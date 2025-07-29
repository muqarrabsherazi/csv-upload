import { FC } from "react";
import { ReactNode } from "react";
import { useTable } from "@contexts/TableProvider";
import { RowProvider } from "@contexts/RowProvider";
import useEscapeKey from "@hooks/useEscapeKey";
import useKeyPressOutside from "@hooks/useKeyPressOutside";

export interface TableProps {
  renderHeaders: ReactNode
  children: ReactNode;
  classNames?: {
    root?: string 
    head?: string
    body?: string
  }
}

const Table: FC <TableProps> = ({ renderHeaders, children, classNames}) => {
  const { rows, resetInputCellCoords} = useTable(); 
  
  useEscapeKey({onEscapePress: resetInputCellCoords})
  useKeyPressOutside({onMouseDown: resetInputCellCoords})

  return (
    <table style={{
      width:"100%"
    }}
      className={classNames?.root?? ""}
    >
      <thead className={classNames?.head?? ""}>
        {renderHeaders}
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
