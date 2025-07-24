import { FC, useState, useCallback, useRef, useEffect } from "react"
import { useTable } from "@contexts/TableProvider";
import type { Coords } from "types";
import { validate } from "@validators/validateCell";
import { useErrors } from "@contexts/ErrorProvider";
import useValidate from "@hooks/useValidate";
import useDebounced from "@hooks/useDebouncedSetCell";
import { CellProps } from "@components/Cell";


export interface InputCellProps extends CellProps {
}

const InputCell: FC<InputCellProps> = ({ coords, value, errorMsg }) => {
  const { getCell, setCell, resetInputCellCoords } = useTable();


  const { checkValidationError } = useValidate();
  const { debounced: debouncedSetCell} = useDebounced(() => { 
    setCell(coords, cellValue); 
    checkValidationError(coords, cellValue) 
  });

  const [cellValue, setCellValue] = useState(value);



  useEffect(() => {
    debouncedSetCell()
  }, [cellValue])




  const errorStyle = errorMsg == null ? {} : { border: "1px solid red" }
  return (
    <td style={{
      border: "1px solid black",
      padding: "8px",
      textAlign: "left",
      maxWidth: "20px",
      ...errorStyle
    }}
    onClick={(e) => e.stopPropagation()}
    
    >
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
        onKeyDown={(e) => {
          if (e.key != "Enter") return;
          resetInputCellCoords(); 
        }}  
        
      />
    </td>
  )
}

export default InputCell;