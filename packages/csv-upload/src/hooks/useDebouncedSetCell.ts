
import { useEffect, useRef } from "react";
import { Coords, CSVFieldSchema } from "types";

const useDebounced = (ftn: () => void): {debounced: ()=> void} => {

  const debouncedId = useRef<number | null>(null);


  const debounced = () => {
    if (debouncedId.current != null)
      clearTimeout(debouncedId.current)
    debouncedId.current = window.setTimeout(ftn, 100)

  }
  return {debounced};
}


export default useDebounced; 