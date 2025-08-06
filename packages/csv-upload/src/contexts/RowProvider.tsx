import { createContext, useState, useContext, ReactNode, type FC, useEffect } from "react";
import { type CSVCellCoords } from "types";

export interface RowContextInterface {
  cellCoords: CSVCellCoords[]
  row: string[]
  rowIndex: number
  cellTemplate: ReactNode 
  errorBoxTemplate: ReactNode
};

export const RowContext = createContext<RowContextInterface | undefined>(undefined);

interface RowProviderProps {
  rowIndex: number
  row: string[]
  cellTemplate: ReactNode
  errorBoxTemplate: ReactNode
  children: ReactNode
}

export const RowProvider: FC<RowProviderProps> = ({rowIndex, row, children, cellTemplate, errorBoxTemplate}) => {
  const cellCoords = row.map((_, colIndex) => ({row: rowIndex, col: colIndex}));
  
  return(
    <RowContext.Provider value={{cellCoords, row, rowIndex, cellTemplate, errorBoxTemplate}}>
      {children}
    </RowContext.Provider>
  )

};


