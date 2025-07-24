
import { useEffect } from "react";


const useKeyPressOutside = ({onMouseDown}:{onMouseDown: () => void}) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      onMouseDown(); 
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}

export default useKeyPressOutside;