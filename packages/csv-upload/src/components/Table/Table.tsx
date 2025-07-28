import { FC } from "react";
import { useTable } from "@contexts/TableProvider";
import Row from "@components/Row";
import { RowProvider } from "@contexts/RowProvider";

const Table: FC = () => {
  const { rows } = useTable(); 

  return (
    <table>
      <tbody>
        {rows.map((row, rowIndex) => (
          <RowProvider key={rowIndex} rowIndex={rowIndex} rowLength={row.length}>
            <Row />
          </RowProvider>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
