import { FC, useState, useEffect, RefObject, useRef, ChangeEvent } from "react"
import useValidate from "@hooks/useValidate";
import useDebounced from "@hooks/useDebouncedSetCell";
import { CellProps } from "@components/Cell";
import useCell from "@hooks/useCell";
import useTable from "@hooks/useTable";
import useErrors from "@hooks/useErrors";
import { ErrorValue } from "@contexts/ErrorProvider";


export interface InputCellProps extends CellProps {
  classNames?: {
    root?: string;
    rootError?: string;
    input?: string;
    inputError?: string;
  }
}

const InputCell: FC<InputCellProps> = ({ children, classNames }) => {
  const { value, coords, errorMsg } = useCell();
  const { inputCellRef, setCell, resetInputCellCoords } = useTable();
  const { checkFrontendError } = useValidate();
  const {addError, removeError, getError} = useErrors()
  const initialValue = useRef<string>(value);
  const backendError = useRef<ErrorValue | null>(null)
  
  const [cellValue, setCellValue] = useState(value);

  const { debounced: debouncedSetCell } = useDebounced(() => {
    setCell(coords, cellValue);
    checkFrontendError(coords, cellValue)
    if (backendError.current == null) return;
    if (cellValue == initialValue.current) addError(coords, backendError.current.msg, "backend");
    else removeError(coords, "backend");
  });

  useEffect(() => {
    const error = getError(coords);
    if (error == null || error.type != "backend") return; 
    backendError.current = error; 
  })

  useEffect(() => {
    debouncedSetCell()
  }, [cellValue])



  const errorStyle = errorMsg == null ? {} : { border: "1px solid red" }
  return (
    <td
      style={{
        border: "1px solid black",
        padding: "8px",
        textAlign: "left",
        maxWidth: "20px",
        ...errorStyle
      }}
      className={classNames?.root ?? "" + " " + (errorMsg ? classNames?.rootError ?? "" : "")}
      onClick={(e) => e.stopPropagation()}

    >
      <div ref={inputCellRef as RefObject<HTMLDivElement>}>
        <input style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",     // Critical: includes padding in width
          font: "inherit",              // Match surrounding text
          padding: 0,                   // Optional: remove default input padding
          margin: 0,                    // Optional: remove default input margin
          background: "transparent",   // Optional: looks like plain cell
        }}

          className={classNames?.input ?? "" + " " + (errorMsg ? classNames?.inputError ?? "" : "")}
          value={cellValue} onChange={(e) => setCellValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            setCell(coords, cellValue);
            checkFrontendError(coords, cellValue);
            resetInputCellCoords();
          }}
          onBlur={resetInputCellCoords}
        

        />
        {children}

      </div>
    </td>
  )
}

export default InputCell;