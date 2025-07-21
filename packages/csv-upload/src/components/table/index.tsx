import {FC, useEffect} from "react"
import Row from "../row";
import Header from "../header";
import { useTable } from "../../context/tableContext";
import useEscapeKey from "../../hooks/escapeKeyHook";

export interface TableProps {
}

const Table: FC<TableProps> = () => {
  const {rows, resetInputCellCoords} = useTable(); 

  useEscapeKey({onEscapePress: resetInputCellCoords});

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
