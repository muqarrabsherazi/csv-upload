import {FC, useEffect} from "react"
import Row from "../row";
import Header from "../header";
import { useTable } from "../../context/rowsContext";

export interface TableProps {
}

const Table: FC<TableProps> = () => {
  const {rows} = useTable(); 

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
