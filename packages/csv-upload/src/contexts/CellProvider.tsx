import { createContext, useState, useContext, ReactNode, type FC, useEffect, useMemo } from "react";
import { CSVCellType, type Coords } from "types";
import { useTable } from "./TableProvider";
import { useErrors } from "./ErrorProvider";
import coordsAreEqual from "@utils/isInputCell";
import { RefObject } from "react";

interface CellContextInterface {
  value: string, 
  type: CSVCellType, 
  errorMsg: string | null
  coords: Coords
};

const CellContext = createContext<CellContextInterface | undefined>(undefined);

interface CellProviderProps {
  coords: Coords
  children: ReactNode
}

export const CellProvider: FC<CellProviderProps> = ({coords, children}) => {
  const {inputCellCoords, getCellValue} = useTable()
  const {getError} = useErrors()

  const value = useMemo(() => getCellValue(coords), [coords]); 
  const errorMsg = useMemo(() => getError(coords), [coords]); 
  const type = coordsAreEqual(inputCellCoords, coords) ? "input" : "display"  
  


  return(
    <CellContext.Provider value={{
      value, 
      errorMsg, 
      type,
      coords, 
    }}>
      {children}
    </CellContext.Provider>
  )

};


export const useCell = () => {
  const context = useContext(CellContext);
  if (!context) {
    throw new Error("useTable must be used within a RowsProvider");
  }
  return context;
};
