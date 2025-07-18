import { useContext, useState, createContext, ReactNode } from 'react';
import makeKey from '../utils/makeKey';

type ErrorMap = {
  [cellKey: string]: string;

};

type ErrorContextType = {
  errors: ErrorMap;
  setErrors: (errors: ErrorMap) => void;
  clearErrors: () => void;
  addError: (row: number, col: number, message: string) => void;

};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  ``
  const [errors, setErrors] = useState<ErrorMap>({});

  const clearErrors = () => setErrors({});
  const addError = (row: number, col: number, message: string) => {
    setErrors((prev) => ({ ...prev, [makeKey(row, col)]: message }));
  }

  return (
    <ErrorContext.Provider value={{ errors, setErrors, clearErrors, addError }}>
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