import { FC } from "react"

interface InputCellProps {
  row: number,
  col: number,
}

const InputCell: FC<InputCellProps> = ({ row, col }) => {
  const testValue = "hello world";
  

  return (
    <td style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
      }}>
    <input placeholder={testValue} onChange={/*context setValue function here*/}></input>

    </td>
  )
}

export default InputCell;