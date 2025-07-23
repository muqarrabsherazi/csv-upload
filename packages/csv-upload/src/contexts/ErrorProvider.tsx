import { useContext, useState, createContext, ReactNode } from 'react';
import serializeCoords from '@utils/serializeCoords';
import { Coords } from 'types';

type ErrorMap = {
  [cellKey: string]: string;

};

type ErrorContextType = {
  errors: ErrorMap;
  setErrors: (errors: ErrorMap) => void;
  clearErrors: () => void;
  addError: (coords: Coords, message: string) => void;
  removeError: (coords: Coords) => void

};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  ``
  const [errors, setErrors] = useState<ErrorMap>({});

  const clearErrors = () => setErrors({});
  const addError = (coords:Coords, message: string) => {
    const key = serializeCoords(coords);
    if (key in errors && message == errors[key]) 
      return
    setErrors((prev) => ({ ...prev, [key]: message }));
  }

  const removeError = (coords:Coords) => {

    const key = serializeCoords(coords);
    if (key in errors)
      setErrors((prev) => {
        const newErrorMap = {...prev}; 
        delete newErrorMap[key]
        return newErrorMap;  
      });
  }

  return (
    <ErrorContext.Provider value={{ errors, setErrors, clearErrors, addError, removeError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrors = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrors must be used within an ErrorProvider");
  }
  return context;
};