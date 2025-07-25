import { createContext, useState, useContext, ReactNode, type FC, useEffect } from "react";
import { type Coords } from "types";

interface RowContextInterface {
  cellCoords: Coords[]
};

const RowContext = createContext<RowContextInterface | undefined>(undefined);

interface RowProviderProps {
  rowIndex: number
  rowLength: number
  children: ReactNode
}

export const RowProvider: FC<RowProviderProps> = ({rowIndex, rowLength, children}) => {
  const cellCoords = Array.from({length: rowLength}).map((_, colIndex) => ({row: rowIndex, col: colIndex}));
  
  return(
    <RowContext.Provider value={{cellCoords}}>
      {children}
    </RowContext.Provider>
  )

};


export const useRow = () => {
  const context = useContext(RowContext);
  if (!context) {
    throw new Error("useTable must be used within a RowsProvider");
  }
  return context;
};
