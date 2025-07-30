import { CSVCellCoords } from "types"
import useErrors from "@hooks/useErrors";
import { validate } from "../../../dsl-validator/src/validateCell";
import useTable from "@hooks/useTable";

const useValidate = (): {checkValidationError: (coords: CSVCellCoords, value: string,) => void} => {
  const {addError, removeError} = useErrors(); 
  const {schema} = useTable();
  

  const checkValidationError = (coords: CSVCellCoords, value: string,) => {
    const field = schema.fields[coords.col];
    const errorMsg = validate(field, value)
    if (errorMsg == null)
      removeError(coords);
    else
      addError(coords, field.errorMsg || errorMsg);
  }
  return {checkValidationError}
}

export default useValidate; 