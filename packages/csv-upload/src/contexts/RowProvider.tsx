import { createContext, useState, useContext, ReactNode, type FC, useEffect } from "react";
import { type Coords } from "types";

interface RowContextInterface {
  cellCoords: Coords[]
  row: string[]
  rowIndex: number
};

const RowContext = createContext<RowContextInterface | undefined>(undefined);

interface RowProviderProps {
  rowIndex: number
  row: string[]
  children: ReactNode
}

export const RowProvider: FC<RowProviderProps> = ({rowIndex, row, children}) => {
  const cellCoords = row.map((_, colIndex) => ({row: rowIndex, col: colIndex}));
  
  return(
    <RowContext.Provider value={{cellCoords, row, rowIndex}}>
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
