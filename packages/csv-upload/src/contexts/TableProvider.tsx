import { createContext, useState, useContext, ReactNode, type FC, useEffect } from "react";
import { CSVFieldSchema, CSVPrimitiveType, CSVSchema } from "types";
import { type Coords } from "../../../types/src/coordsType";
import { validator, checkRequired } from "@validators/validateCell";

interface TableContextInterface {
  schema: CSVSchema, 
  rows: string[][];
  inputCellCoords: Coords | null;
  headers: string[];
  hoverCellCoords: Coords | null;
  addRow: (row: string[]) => void,
  getCell: (coords: Coords) => string, 
  setCell: (coords: Coords, value:string) => void, 
  clearRows: () => void, 
  setHeaders: (header: string[]) => void;
  setInputCellCoords:(coords: Coords) => void;
  setHoverCellCoords:(coords: Coords) => void;
  resetHoverCellCoords: (coords: Coords) => void;
  resetInputCellCoords: () => void; 
};

const TableContext = createContext<TableContextInterface | undefined>(undefined);

interface TableProviderProps {
  schema: CSVSchema,
  children: ReactNode, 
}

export const TableProvider: FC<TableProviderProps> = ({ children, schema }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const [inputCellCoords, setInputCellCoords] = useState<Coords | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [hoverCellCoords, setHoverCellCoords] = useState<Coords | null>(null);

  const addRow = (row: string[]) => setRows(prev => [...prev, row]);
  const clearRows = () => setRows([]);
  const getCell = (coords: Coords) => rows[coords.row][coords.col];
  const resetInputCellCoords = () => setInputCellCoords(null);
  const resetHoverCellCoords = () => setHoverCellCoords(null);

  const setCell = (coords: Coords, value: string) => setRows(prev => {
    // prev[coords.row][coords.col] = value; 
    
    const {type, required} = schema.fields[coords.col]; 
    const newRows = [...prev];
    const newRow = [...newRows[coords.row]];
    newRow[coords.col] = value; 
    newRows[coords.row] = newRow; 
    return newRows;  
  });


  return (
    <TableContext.Provider  
      value={{ 
        rows, 
        inputCellCoords, 
        headers, 
        schema,
        addRow, 
         hoverCellCoords,
        clearRows, 
        setInputCellCoords,
        resetInputCellCoords,
        setHeaders,
        getCell,
        setCell,
        setHoverCellCoords,
        resetHoverCellCoords

      }}>
      {children}
    </TableContext.Provider>
  );
};


export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a RowsProvider");
  }
  return context;
};
