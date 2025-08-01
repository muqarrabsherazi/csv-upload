import { createContext, useState, useContext, ReactNode, type FC, useEffect, useMemo } from "react";
import { CSVCellType, type Coords } from "types";
import  useErrors  from "@hooks/useErrors";
import coordsAreEqual from "@utils/isInputCell";
import useTable from "@hooks/useTable";

export interface CellContextInterface {
  value: string, 
  type: CSVCellType, 
  errorMsg: string | null
  shouldDisplayError: boolean
  coords: Coords
}

export const CellContext = createContext<CellContextInterface | undefined>(undefined);

interface CellProviderProps {
  coords: Coords
  children: ReactNode
}

export const CellProvider: FC<CellProviderProps> = ({coords, children}) => {
  const {inputCellCoords, hoverCellCoords, getCellValue} = useTable()
  const {getError} = useErrors()
            
  const value = useMemo(() => getCellValue(coords), [coords]); 
  const errorMsg = useMemo(() => getError(coords), [coords]); 
  const type = coordsAreEqual(inputCellCoords, coords) ? "input" : "display"  
  const shouldDisplayError =  errorMsg != null && 
        (coordsAreEqual(hoverCellCoords, coords) || coordsAreEqual(inputCellCoords, coords))
  

  return(
    <CellContext.Provider value={{
      value, 
      errorMsg, 
      type,
      coords, 
      shouldDisplayError
    }}>
      {children}
    </CellContext.Provider>
  )

};

