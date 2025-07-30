import { CSVCellCoords } from "types"
import useErrors from "@hooks/useErrors";
import { validate } from "dsl-validator";
import useTable from "@hooks/useTable";

const useValidate = (): {checkFrontendError: (coords: CSVCellCoords, value: string,) => void} => {
  const {addError, removeError} = useErrors(); 
  const {schema} = useTable();


  const checkFrontendError = (coords: CSVCellCoords, value: string) => {
    const field = schema.fields[coords.col];
    const errorMsg = validate(field, value)
    if (errorMsg == null)
      removeError(coords, "frontend");
    else
      addError(coords, field.errorMsg || errorMsg, "frontend");
  }

  return {checkFrontendError}
}

export default useValidate; 