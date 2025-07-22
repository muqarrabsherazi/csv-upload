import {FC, useEffect} from "react"
import Row from "@components/internal/Row";
import Header from "@components/internal/Header";
import { useTable } from "@contexts/TableProvider";
import useEscapeKey from "@hooks/useEscapeKey";
import { useErrors } from "@contexts/ErrorProvider";

export interface TableProps {

}

const Table: FC<TableProps> = () => {
  const {rows, resetInputCellCoords} = useTable(); 
  const {errors} = useErrors()

  useEscapeKey({onEscapePress: resetInputCellCoords});

  useEffect(() => {
    console.log(rows);
  }, [rows])


  useEffect(() => {
    console.log();
  }, [rows])

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <Header/>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} rowIndex={rowIndex} row={row} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
