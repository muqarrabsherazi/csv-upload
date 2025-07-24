import { FC, useEffect } from "react"
import Row from "@components/Row";
import Header from "@components/Header";
import { useTable } from "@contexts/TableProvider";
import useEscapeKey from "@hooks/useEscapeKey";
import { useErrors } from "@contexts/ErrorProvider";
import useKeyPressOutside from "@hooks/useKeyPressOutside";

export interface TableProps {
  renderHeaders?: (header: string, colIndex: number) => React.ReactNode
  children?: (row: string[], rowIndex: number) => React.ReactNode;
}

const Table: FC<TableProps> = ({ renderHeaders, children }) => {
  const { schema, rows, headers, resetInputCellCoords } = useTable();
  const { errors } = useErrors()
  useEscapeKey({ onEscapePress: resetInputCellCoords });
  useKeyPressOutside({ onMouseDown: resetInputCellCoords })


  useEffect(() => {
    console.log(errors);
  }, [errors])


  // useEffect(() => {
  //   console.log(rows);
  // }, [rows])

  // if (children)
  //   return children(rows as string[][]);



  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {renderHeaders ? headers.map(renderHeaders) : <Header />}
      </thead>
      <tbody>
        {children ? rows.map(children) :
          rows.map((row, rowIndex) => (
            <Row key={rowIndex} rowIndex={rowIndex} row={row} />
          ))}
      </tbody>
    </table>
  )
}

export default Table;
