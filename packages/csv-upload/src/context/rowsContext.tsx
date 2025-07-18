import { createContext, useState, useContext, ReactNode, type FC, useEffect } from "react";
import { CSVFieldSchema, CSVPrimitiveType, CSVSchema } from "types";
import { type Coords } from "../utils/coordsType";



interface TableContextInterface {
  rows: string[][];
  inputCell: Coords | null;
  headers: CSVFieldSchema[];
  addRow: (row: string[]) => void,

  getCell: (coords: Coords) => string, 
  setCell: (coords: Coords, value:string) => void, 
  clearRows: () => void, 
  setHeaders: (header: CSVFieldSchema[]) => void;
  setInputRow:(row: number) => void;
  setInputCol: (col: number) => void;
};

const TableContext = createContext<TableContextInterface | undefined>(undefined);

interface TableProviderProps {
  schema: CSVSchema,
  children: ReactNode, 
}


export const TableProvider: FC<TableProviderProps> = ({ children, schema }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const [inputCell, setInputCell] = useState<Coords | null>(null);
  const [headers, setHeaders] = useState<CSVFieldSchema[]>([]);


  
  const addRow = (row: string[]) => setRows(prev => [...prev, row]);
  const clearRows = () => setRows([]);
  const getCell = (coords: Coords) => rows[coords.row][coords.col];

  const setCell = (coords: Coords, value: string) => setRows(prev => {
    prev[coords.row][coords.col] = value; 
    return [...prev];
  });

  const setInputRow = (row: number) => inputCell == null ? setInputCell({row: row, col: 0}) : setInputCell({...inputCell, row})
  const setInputCol = (col: number) => inputCell == null ? setInputCell({row: 0, col: col}) : setInputCell({...inputCell, col})


  useEffect(() => {
    setHeaders(schema.fields)
  }, [])


  return (
    <TableContext.Provider  
      value={{ 
        rows, 
        inputCell, 
        headers, 
        addRow, 
        clearRows, 
        setInputRow,  
        setInputCol,
        setHeaders,
        getCell,
        setCell
      }}>
      {children}
    </TableContext.Provider>
  );
};


export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useRows must be used within a RowsProvider");
  }
  return context;
};
