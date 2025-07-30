import { useContext } from "react";
import { ErrorContext } from "@contexts/ErrorProvider";

const useErrors = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrors must be used within an ErrorProvider");
  }
  return context;
};
export default useErrors; 