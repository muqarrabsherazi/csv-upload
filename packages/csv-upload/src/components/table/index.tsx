import {FC} from "react"
import Row from "../row";

interface TableProps {
}

const Table: FC<TableProps> = () => {
  const testRows = [["hello1", "hello2", "hello3"], [], []];
  return (
    <table>
      {testRows.map((_, rowIndex) => (
        <Row rowIndex={rowIndex}/>
      ))
      }
    </table>
  )
}

export default Table;
