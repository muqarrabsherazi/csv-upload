import { FC, useState, useCallback, useRef } from "react"

interface InputCellProps {
  row: number,
  col: number,
}

const InputCell: FC<InputCellProps> = ({ row, col }) => {
  const testValue = "hello world";
  const [value, setValue] = useState(testValue);
  const debouncedId = useRef<number | null>(null);
  

  
  const setDebouncedValue = useCallback((value: string) => {
    if (debouncedId.current != null)
      clearTimeout(debouncedId.current)
    debouncedId.current = window.setTimeout(() => setValue(value), 100)
  }, [])


  return (
    <td style={{
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
    }}>
      <input placeholder={testValue} value={value} onChange={(e) => setValue(e.target.value)}></input>

    </td>
  )
}

export default InputCell;