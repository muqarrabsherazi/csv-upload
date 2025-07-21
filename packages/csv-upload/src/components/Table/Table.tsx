import {FC, useEffect} from "react"
import Row from "@components/internal/Row";
import Header from "@components/internal/Header";
import { useTable } from "@contexts/TableProvider";
import useEscapeKey from "@hooks/useEscapeKey";

export interface TableProps {
}

const Table: FC<TableProps> = () => {
  const {rows, resetInputCellCoords} = useTable(); 

  useEscapeKey({onEscapePress: resetInputCellCoords});
  useEffect(() => {
    console.log(rows);
  }, [rows])

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <Header/>
      </thead>
      <tbody>
        {rows.map((_, rowIndex) => (
          <Row key={rowIndex} rowIndex={rowIndex} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
