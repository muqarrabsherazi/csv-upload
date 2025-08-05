import { createContext, ReactNode, type FC, useMemo } from "react";
import { CSVCellType, CSVCellCoords } from "types";
import  useErrors  from "@hooks/useErrors";
import coordsAreEqual from "@utils/coordsAreEqual";
import useTable from "@hooks/useTable";

export interface CellContextInterface {
  value: string, 
  type: CSVCellType, 
  errorMsg: string | null
  shouldDisplayErrorBox: boolean
  coords: CSVCellCoords
}

export const CellContext = createContext<CellContextInterface | undefined>(undefined);

interface CellProviderProps {
  coords: CSVCellCoords
  children: ReactNode
}

export const CellProvider: FC<CellProviderProps> = ({coords, children}) => {
  const {inputCellCoords, hoverCellCoords, getCellValue} = useTable()
  const {getError} = useErrors()
            
  const value = useMemo(() => getCellValue(coords), [coords]); 
  const errorMsg = useMemo(() => getError(coords)?.msg ?? null, [coords]); 
  const type = coordsAreEqual(inputCellCoords, coords) ? "input" : "display"  
  const shouldDisplayErrorBox =  errorMsg != null && 
        (coordsAreEqual(hoverCellCoords, coords) || coordsAreEqual(inputCellCoords, coords))
  

  return(
    <CellContext.Provider value={{
      value, 
      errorMsg, 
      type,
      coords, 
      shouldDisplayErrorBox
    }}>
      {children}
    </CellContext.Provider>
  )

};

