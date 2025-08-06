import { useContext } from "react";
import { CellContext } from "@contexts/CellProvider";

const useCell = () => {
  const context = useContext(CellContext);
  if (!context) {
    throw new Error("Use cell provider within a row");
  }
  return context;
};
export default useCell; 
