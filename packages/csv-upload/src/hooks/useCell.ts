import { useContext } from "react";
import { CellContext } from "@contexts/CellProvider";

const useCell = () => {
  const context = useContext(CellContext);
  if (!context) {
    throw new Error("useTable must be used within a RowsProvider");
  }
  return context;
};
export default useCell; 
