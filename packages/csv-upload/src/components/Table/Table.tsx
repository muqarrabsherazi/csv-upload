import { FC } from "react";
import { useTable } from "@contexts/TableProvider";
import Row from "@components/Row";
import { RowProvider } from "@contexts/RowProvider";

export interface TableProps{}

const Table: FC <TableProps> = () => {
  const { rows } = useTable(); 

  return (
    <table>
      <tbody>
        {rows.map((row, rowIndex) => (
          <RowProvider key={rowIndex} rowIndex={rowIndex} row={row}>
            <Row />
          </RowProvider>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
