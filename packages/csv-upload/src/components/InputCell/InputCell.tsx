import { FC, useState, useEffect, RefObject } from "react"
import useValidate from "@hooks/useValidate";
import useDebounced from "@hooks/useDebouncedSetCell";
import { CellProps } from "@components/Cell";
import useCell from "@hooks/useCell";
import useTable from "@hooks/useTable";


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
  const { checkValidationError } = useValidate();
  const [cellValue, setCellValue] = useState(value);

  const { debounced: debouncedSetCell } = useDebounced(() => {
    setCell(coords, cellValue);
    checkValidationError(coords, cellValue)
  });

  useEffect(() => {
    debouncedSetCell()
  }, [cellValue])

  const errorStyle = errorMsg == null ? {} : { border: "1px solid red" }
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
          className={classNames?.input ?? "" + " " + errorInputClassName}
          value={cellValue} onChange={(e) => setCellValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            resetInputCellCoords();
          }}
          onBlur={() => resetInputCellCoords()}
        

        />
        {children}

    </td>
  )
}

export default InputCell;