import { createContext, useState, useContext, ReactNode, type FC, useEffect, useReducer, useRef, RefObject } from "react";
import { type CSVSchema } from "dsl-validator";
import { type CSVCellCoords } from "types";

export interface TableContextInterface {
  schema: CSVSchema, 
  rows: string[][];
  inputCellCoords: CSVCellCoords | null;
  inputCellRef: RefObject<HTMLInputElement | null>;
  headers: string[];
  hoverCellCoords: CSVCellCoords | null;
  lastChangedRow: number | null; 
  addRow: (row: string[]) => void,
  getCellValue: (coords: CSVCellCoords) => string, 
  setCell: (coords: CSVCellCoords, value:string) => void, 
  clearRows: () => void, 
  setHeaders: (header: string[]) => void;
  setInputCellCoords:(coords: CSVCellCoords) => void;
  setHoverCellCoords:(coords: CSVCellCoords) => void;
  resetHoverCellCoords: () => void;
  resetInputCellCoords: () => void; 
  onUploadClick: (rows: string[][], lastChangedRow: number) => void
};

export const TableContext = createContext<TableContextInterface | undefined>(undefined);

interface TableProviderProps {
  schema: CSVSchema
  onUploadClick: (rows: string[][], lastChangedRow: number) => void
  data?: string[][]
  children: ReactNode
}

export const TableProvider: FC<TableProviderProps> = ({ children, schema, onUploadClick, data = [] }) => {
  const [rows, setRows] = useState<string[][]>(data);
  const [inputCellCoords, setInputCellCoords] = useState<CSVCellCoords | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [hoverCellCoords, setHoverCellCoords] = useState<CSVCellCoords | null>(null);
  const [lastChangedRow, setLastChangedRow] = useState<number | null>(null);
  const inputCellRef = useRef<HTMLInputElement | null>(null)


  const addRow = (row: string[]) => setRows(prev => [...prev, row]);
  const clearRows = () => setRows([]);
  const getCellValue = (coords: CSVCellCoords) => rows[coords.row][coords.col];
  const resetInputCellCoords = () => setInputCellCoords(null);
  const resetHoverCellCoords = () => setHoverCellCoords(null);

  const setCell = (coords: CSVCellCoords, value: string) => setRows(prev => {
    const newRows = [...prev];
    const newRow = [...newRows[coords.row]];
    newRow[coords.col] = value; 
    newRows[coords.row] = newRow; 
    setLastChangedRow(prev => prev == null? coords.row :Math.min(prev, coords.row));
    return newRows;  
  });

  const modifiedOnUploadClick = (rows: string[][], lastChangedRow: number) => {
    onUploadClick(rows, lastChangedRow);
    setLastChangedRow(null);
  } 


  // useEffect(() => {
  //   setRows(data);
  //   setLastChangedRow(null)
  //   resetHoverCellCoords();
  //   resetInputCellCoords();
  // }, [data])

  return (
    <TableContext.Provider  
      value={{ 
        rows, 
        inputCellCoords, 
        inputCellRef,
        hoverCellCoords,
        headers, 
        schema,
        lastChangedRow,
        addRow, 
        clearRows, 
        setInputCellCoords,
        resetInputCellCoords,
        setHeaders,
        getCellValue,
        setCell,
        setHoverCellCoords,
        resetHoverCellCoords,
        onUploadClick: modifiedOnUploadClick

      }}>
      {children}
    </TableContext.Provider>
  );
};

