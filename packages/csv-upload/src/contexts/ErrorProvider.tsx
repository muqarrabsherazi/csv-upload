import { useContext, useState, createContext, ReactNode } from 'react';
import serializeCoords from '@utils/serializeCoords';
import { CSVCellCoords } from 'types';

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

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  ``
  const [errors, setErrors] = useState<ErrorMap>({});

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

  return (
    <ErrorContext.Provider value={{ errors, getError, setErrors, clearErrors, addError, removeError }}>
      {children}
    </ErrorContext.Provider>
  );
};
