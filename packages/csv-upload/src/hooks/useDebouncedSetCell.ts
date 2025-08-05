import { useRef } from "react";

type UseDebounced = (ftn: () => void, timeout?: number) => { debounced: () => void };

const useDebounced: UseDebounced = (ftn, timeout = 100) => {
  const debouncedId = useRef<number | null>(null);

  const debounced = () => {
    if (debouncedId.current !== null) {
      clearTimeout(debouncedId.current);
    }
    debouncedId.current = window.setTimeout(ftn, timeout);
  };

  return { debounced };
};

export default useDebounced;
