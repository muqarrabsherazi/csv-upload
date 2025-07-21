import { FC, useState, useCallback, useRef, useEffect } from "react"
import { useTable } from "../../context/tableContext";
import { Coords } from "../../utils/coordsType";

interface InputCellProps {
  coords: Coords
}

const InputCell: FC<InputCellProps> = ({coords}) => {
  const {getCell, setCell} = useTable(); 

  const [value, setValue] = useState(getCell(coords));
  const debouncedId = useRef<number | null>(null);
  

  
  useEffect(() => {
    if (debouncedId.current != null)
      clearTimeout(debouncedId.current)
    debouncedId.current = window.setTimeout(() => setCell(coords, value), 100)
  }, [value])


  return (
    <td style={{
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
    }}>
      <input style={{
      width: "100%",
      boxSizing: "border-box",     // Critical: includes padding in width
      font: "inherit",              // Match surrounding text
      padding: 0,                   // Optional: remove default input padding
      margin: 0,                    // Optional: remove default input margin
      border: "none",              // Optional: remove input border
      outline: "none",             // Optional: prevent outline on focus
      background: "transparent",   // Optional: looks like plain cell
      

    }} placeholder={getCell(coords)} value={value} onChange={(e) => setValue(e.target.value)}></input>
    </td>
  )
}

export default InputCell;