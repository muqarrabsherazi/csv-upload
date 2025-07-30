import { useContext } from "react";
import { TableContext } from "@contexts/TableProvider";

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a RowsProvider");
  }
  return context;
};
export default useTable; 