
import { useContext } from "react";
import { RowContext } from "@contexts/RowProvider";

const useRow = () => {
  const context = useContext(RowContext);
  if (!context) {
    throw new Error("useRow must be used within a Row");
  }
  return context;
};

export default useRow; 