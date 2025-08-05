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
  
  const [cellValue, setCellValue] = useState(value);

  const { debounced: debouncedSetCell } = useDebounced(() => {
    setCell(coords, cellValue);
    checkFrontendError(coords, cellValue)
    
    const error = getError(coords);
    if (error == null || error.type != "backend") return; 
    if (cellValue == initialValue.current) addError(coords, error.msg, "backend");
    else removeError(coords, "backend");
  });

  useEffect(() => {
    debouncedSetCell()
  }, [cellValue])

  const errorClassName = (errorMsg ? classNames?.rootError ?? "" : "")
  const errorInputClassName = (errorMsg ? classNames?.inputError?? "" : "")

  useEffect(() => {
    if (inputCellRef.current)
      inputCellRef.current.focus({preventScroll: true});
  }, [inputCellRef.current])

  return (
    <td
      className={(classNames?.root ?? "") + " " + errorClassName}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        ref={inputCellRef as RefObject<HTMLInputElement>}    
        className={(classNames?.input ?? "") + " " + errorInputClassName}
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
    </td>
  )
}

export default InputCell;