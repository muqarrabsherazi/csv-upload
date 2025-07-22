import { useErrors } from "@contexts/ErrorProvider"
import { Coords } from "types"
import { validate } from "@validators/validateCell";
import { useTable } from "@contexts/TableProvider";

const useValidate = (): {checkValidationError: (coords: Coords, value: string,) => void} => {
  const {addError, removeError} = useErrors(); 
  const {schema} = useTable();
  

  const checkValidationError = (coords: Coords, value: string,) => {
    const field = schema.fields[coords.col];
    // console.log(schema)
    console.log(coords)
    
    const errorMsg = validate(field, value)
    if (errorMsg == null)
      removeError(coords);
    else
      addError(coords, field.errorMsg || errorMsg);
  }
  return {checkValidationError}
}

export default useValidate; 