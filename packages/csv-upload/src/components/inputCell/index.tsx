import { FC, useState, useCallback, useRef } from "react"
import { useTable } from "../../context/rowsContext";
import { Coords } from "../../utils/coordsType";

interface InputCellProps {
  coords: Coords
}

const InputCell: FC<InputCellProps> = ({coords}) => {
  const {getCell, setCell} = useTable(); 

  const [value, setValue] = useState(getCell(coords));
  const debouncedId = useRef<number | null>(null);
  

  
  const setDebouncedValue = useCallback((value: string) => {
    if (debouncedId.current != null)
      clearTimeout(debouncedId.current)
    debouncedId.current = window.setTimeout(() => setCell(coords, value), 100)
  }, [])


  return (
    <td style={{
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
    }}>
      <input placeholder={getCell(coords)} value={value} onChange={(e) => setValue(e.target.value)}></input>

    </td>
  )
}

export default InputCell;