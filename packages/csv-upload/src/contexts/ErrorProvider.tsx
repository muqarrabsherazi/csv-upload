import { useContext, useState, createContext, ReactNode, FC, useEffect, useRef} from 'react';
import serializeCoords from '@utils/serializeCoords';
import { CSVCellCoords, CSVError } from 'types';
import { error } from 'console';
import errorDifference from '@utils/errorDifference';

type ErrorMap = {
  [cellKey: string]: string;

};

export interface ErrorContextInterface {
  errors: ErrorMap;
  setErrors: (errors: ErrorMap) => void;
  getError: (coords: CSVCellCoords) => string | null;
  clearErrors: () => void;
  addError: (coords: CSVCellCoords, message: string) => void;
  removeError: (coords: CSVCellCoords) => void

};

export const ErrorContext = createContext<ErrorContextInterface | undefined>(undefined);

export interface ErrorProviderProps {
  externalErrors: CSVError[]
  onErrorResolve?: () => void
  children: ReactNode
}

export const ErrorProvider: FC<ErrorProviderProps> = ({ children, externalErrors, onErrorResolve }) => {
  const [errors, setErrors] = useState<ErrorMap>({});
  const prevErrors = useRef<CSVError[] | null>(null);



  const getError = (coords: CSVCellCoords) => serializeCoords(coords) in errors ? errors[serializeCoords(coords)] : null
  const clearErrors = () => setErrors({});
  const addError = (coords:CSVCellCoords, message: string) => {
    const key = serializeCoords(coords);
    if (key in errors && message == errors[key]) 
      return
    setErrors((prev) => ({ ...prev, [key]: message }));
  }

  const removeError = (coords:CSVCellCoords) => {
    const key = serializeCoords(coords);
    if (key in errors)
      setErrors((prev) => {
        const newErrorMap = {...prev}; 
        delete newErrorMap[key]
        return newErrorMap;  
      });
  }

  useEffect(() => {
    externalErrors.forEach((error) => {
      addError(error.coords, error.msg)
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

  useEffect(() => {
    if (onErrorResolve != null && Object.keys(errors).length === 0) 
      onErrorResolve();

  }, [errors])



  return (
    <ErrorContext.Provider value={{ errors, getError, setErrors, clearErrors, addError, removeError }}>
      {children}
    </ErrorContext.Provider>
  );
};
