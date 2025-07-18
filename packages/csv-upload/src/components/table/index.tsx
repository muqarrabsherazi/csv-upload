import {FC} from "react"
import Row from "../row";
import Header from "../header";

export interface TableProps {
}

const Table: FC<TableProps> = () => {
  const testRows = [["hello1", "hello2", "hello3"], [], []];
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <Header/>
      </thead>
      <tbody>
        {testRows.map((_, rowIndex) => (
          <Row key={rowIndex} rowIndex={rowIndex} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
