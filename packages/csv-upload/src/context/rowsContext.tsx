import { createContext, useState, useContext, ReactNode } from "react";
import { CSVFieldSchema } from "types";

type RowsContextType = {
  rows: string[][];
  setRows: (rows: string[][]) => void;
  cell: [number,number] | null;
  setCell:(cell: [number, number] | null) => void;
  input: boolean;
  setInput: (val:boolean) => void;
  header: CSVFieldSchema[];
  setHeader: (header: CSVFieldSchema[]) => void;

};

const RowsContext = createContext<RowsContextType | undefined>(undefined);

export const RowsProvider = ({ children }: { children: ReactNode }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const [cell, setCell] = useState<[number, number] | null>(null);
  const [input, setInput] = useState<boolean>(false);  
  const [header, setHeader] = useState<CSVFieldSchema[]>([]);

  return (
    <RowsContext.Provider  value={{ rows, setRows, cell, setCell, input, setInput, header, setHeader }}>
      {children}
    </RowsContext.Provider>
  );
};

export const useRows = () => {
  const context = useContext(RowsContext);
  if (!context) {
    throw new Error("useRows must be used within a RowsProvider");
  }
  return context;
};
