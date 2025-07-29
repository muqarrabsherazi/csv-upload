import { FC } from "react";
import { ReactNode } from "react";
import { useTable } from "@contexts/TableProvider";
import useEscapeKey from "@hooks/useEscapeKey";
import { useErrors } from "@contexts/ErrorProvider";
import useKeyPressOutside from "@hooks/useKeyPressOutside";
import { RowProvider } from "@contexts/RowProvider";

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
  const { rows } = useTable(); 

  return (
    <table style={{
      width:"100%"
    }}>
      <thead>
        {renderHeaders}
      </thead>
      <tbody>
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
