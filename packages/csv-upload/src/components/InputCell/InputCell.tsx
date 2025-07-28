import { FC, useState, useEffect } from "react"
import { useTable } from "@contexts/TableProvider";
import useValidate from "@hooks/useValidate";
import useDebounced from "@hooks/useDebouncedSetCell";
import { CellProps } from "@components/Cell";
import { useCell } from "@contexts/CellProvider";


export interface InputCellProps extends CellProps {
  classNames: {
    root?: string; 
    rootError?: string;
    input?: string;
    inputError?: string;
  }

}

const InputCell: FC<InputCellProps> = ({children, classNames}) => {
  const {value, coords, errorMsg} = useCell(); 
  const {setCell, resetInputCellCoords } = useTable();
  const { checkValidationError } = useValidate();
  const [cellValue, setCellValue] = useState(value);

  const { debounced: debouncedSetCell} = useDebounced(() => { 
    setCell(coords, cellValue); 
    checkValidationError(coords, cellValue) 
  });

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
    className = {classNames?.root?? ""  + " " + (errorMsg ? classNames?.rootError?? "" : "")}
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

        className = {classNames?.input?? ""  + " " + (errorMsg ? classNames?.inputError?? "" : "")}
        value={cellValue} onChange={(e) => setCellValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key != "Enter") return;
          resetInputCellCoords(); 
        }}  
        
      />
      {children}
    </td>
  )
}

export default InputCell;