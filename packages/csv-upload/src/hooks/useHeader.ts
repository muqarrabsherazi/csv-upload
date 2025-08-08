import { useContext } from "react";
import { HeaderContext } from "@contexts/HeaderProvider";

const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader should be used within Header Context");
  }
  return context;
};

export default useHeader; 
