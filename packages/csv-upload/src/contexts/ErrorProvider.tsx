import { useContext, useState, createContext, ReactNode, FC, useEffect, useRef} from 'react';
import serializeCoords from '@utils/serializeCoords';
import { CSVCellCoords, CSVError, CSVErrorType } from 'types';
import errorDifference from '@utils/errorDifference';

export type ErrorValue = {msg: string, type: CSVErrorType}

type ErrorMap = {
  [cellKey: string]: ErrorValue;
};


export interface ErrorContextInterface {
  errors: ErrorMap;
  setErrors: (errors: ErrorMap) => void;
  getError: (coords: CSVCellCoords) => ErrorValue | null;
  clearErrors: () => void;
  addError: (coords: CSVCellCoords, msg: string, type: CSVErrorType) => void;
  removeError: (coords: CSVCellCoords, type: CSVErrorType ) => void

};

export const ErrorContext = createContext<ErrorContextInterface | undefined>(undefined);

export interface ErrorProviderProps {
  externalErrors: CSVError[]
  onErrorResolve?: () => void
  children: ReactNode
}

export const ErrorProvider: FC<ErrorProviderProps> = ({ children, externalErrors}) => {
  const [errors, setErrors] = useState<ErrorMap>({});
  const prevErrors = useRef<CSVError[] | null>(null);



  const getError = (coords: CSVCellCoords) => serializeCoords(coords) in errors ? errors[serializeCoords(coords)] : null
  const clearErrors = () => setErrors({});
  const addError = (coords:CSVCellCoords, msg: string, type: CSVErrorType) => {
    const key = serializeCoords(coords);
    if (key in errors && msg == errors[key].msg) 
      return
    setErrors((prev) => ({ ...prev, [key]: { msg, type}}));
  }

  const removeError = (coords:CSVCellCoords, type:CSVErrorType) => {
    const key = serializeCoords(coords);
    if (key in errors && errors[key].type == type)
      setErrors((prev) => {
        const newErrorMap = {...prev}; 
        delete newErrorMap[key]
        return newErrorMap;  
      });
  }

  useEffect(() => {
    externalErrors.forEach((error) => {
      addError(error.coords, error.msg, "backend")
    })

    if (prevErrors.current != null)
    {
      const removedErrors = errorDifference(prevErrors.current, externalErrors);
      setErrors((prev) => {
        const newErrorMap = {...prev};
        removedErrors.forEach(e => {
          const key = serializeCoords(e.coords);
          if ( key in newErrorMap)
            delete newErrorMap[key]
        })  
        return newErrorMap; 
      })
    }
    prevErrors.current = externalErrors;
    
  }, [externalErrors])

  return (
    <ErrorContext.Provider value={{ errors, getError, setErrors, clearErrors, addError, removeError }}>
      {children}
    </ErrorContext.Provider>
  );
};
