import { useEffect, useRef } from "react"
import { CSVError, CSVCellCoords, CSVErrorType } from "types"
import errorDifference from "@utils/errorDifference"

interface UseExternalErrors {
  externalErrors: CSVError[]
  addError: (coords: CSVCellCoords, msg: string, type: CSVErrorType) => void;
  removeError: (coords: CSVCellCoords, type: CSVErrorType) => void

}

const useExternalErrors = ({externalErrors, addError, removeError}: UseExternalErrors) => {
  const prevErrors = useRef<CSVError[] | null>(null);

  useEffect(() => {
    externalErrors.forEach((error) => {
      addError(error.coords, error.msg, "backend")
    })

    if (prevErrors.current != null) {
      const removedErrors = errorDifference(prevErrors.current, externalErrors);
      removedErrors.forEach(e => removeError(e.coords, "backend"))
    }
    prevErrors.current = externalErrors;

  }, [externalErrors])
}

export default useExternalErrors;