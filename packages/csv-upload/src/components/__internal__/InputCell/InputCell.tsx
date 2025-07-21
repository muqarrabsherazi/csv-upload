import { FC, useState, useCallback, useRef, useEffect } from "react"
import { useTable } from "@contexts/TableProvider";
import type { Coords } from "types";
import { validate } from "@validators/validateCell";
import { useErrors } from "@contexts/ErrorProvider";


interface InputCellProps {
  coords: Coords
  value: string
}

const InputCell: FC<InputCellProps> = ({coords, value}) => {
  const {getCell, setCell, schema} = useTable(); 
  const {addError, removeError} = useErrors()

  const [cellValue, setCellValue] = useState(value);
  const debouncedId = useRef<number | null>(null);
  

  
  useEffect(() => {
    if (debouncedId.current != null)
      clearTimeout(debouncedId.current)
    debouncedId.current = window.setTimeout(() => {

      setCell(coords, cellValue);
      const field = schema.fields[coords.col];
      const errorMsg = validate(field, cellValue)
      if (errorMsg == null)
        removeError(coords);
      else
        addError(coords, field.errorMsg || errorMsg);
      
    }, 100)
  }, [cellValue])


  return (
    <td style={{
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
      maxWidth: "20px"
    }}>
      <input style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",     // Critical: includes padding in width
        font: "inherit",              // Match surrounding text
        padding: 0,                   // Optional: remove default input padding
        margin: 0,                    // Optional: remove default input margin
        // border: "none",              // Optional: remove input border
        // outline: "none",             // Optional: prevent outline on focus
        background: "transparent",   // Optional: looks like plain cell
      }} 
        placeholder={getCell(coords)} value={cellValue} onChange={(e) => setCellValue(e.target.value)}
      />
    </td>
  )
}

export default InputCell;