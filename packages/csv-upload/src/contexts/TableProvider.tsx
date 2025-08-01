import { createContext, useState, useContext, ReactNode, type FC, useEffect, useReducer, useRef, RefObject } from "react";
import { type CSVSchema } from "types";
import { type Coords } from "types";

export interface TableContextInterface {
  schema: CSVSchema, 
  rows: string[][];
  inputCellCoords: Coords | null;
  inputCellRef: RefObject<HTMLInputElement | null>;
  headers: string[];
  hoverCellCoords: Coords | null;
  addRow: (row: string[]) => void,
  getCellValue: (coords: Coords) => string, 
  setCell: (coords: Coords, value:string) => void, 
  clearRows: () => void, 
  setHeaders: (header: string[]) => void;
  setInputCellCoords:(coords: Coords) => void;
  setHoverCellCoords:(coords: Coords) => void;
  resetHoverCellCoords: () => void;
  resetInputCellCoords: () => void; 
  onUploadClick: (rows: string[][]) => void
};

export const TableContext = createContext<TableContextInterface | undefined>(undefined);

interface TableProviderProps {
  schema: CSVSchema
  onUploadClick: (rows: string[][]) => void
  data?: string[][]
  children: ReactNode
}

export const TableProvider: FC<TableProviderProps> = ({ children, schema, onUploadClick, data = [] }) => {
  const [rows, setRows] = useState<string[][]>(data);
  const [inputCellCoords, setInputCellCoords] = useState<Coords | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [hoverCellCoords, setHoverCellCoords] = useState<Coords | null>(null);
  const inputCellRef = useRef<HTMLInputElement | null>(null)

  const addRow = (row: string[]) => setRows(prev => [...prev, row]);
  const clearRows = () => setRows([]);
  const getCellValue = (coords: Coords) => rows[coords.row][coords.col];
  const resetInputCellCoords = () => setInputCellCoords(null);
  const resetHoverCellCoords = () => setHoverCellCoords(null);

  const setCell = (coords: Coords, value: string) => setRows(prev => {
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
        inputCellRef,
        hoverCellCoords,
        headers, 
        schema,
        addRow, 
        clearRows, 
        setInputCellCoords,
        resetInputCellCoords,
        setHeaders,
        getCellValue,
        setCell,
        setHoverCellCoords,
        resetHoverCellCoords,
        onUploadClick, 

      }}>
      {children}
    </TableContext.Provider>
  );
};

