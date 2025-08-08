import { createContext, ReactNode, type FC, useMemo } from "react";
import useTable from "@hooks/useTable";

export interface HeaderContextInterface {
  headerIndex: number;
  header: string;
}

export const HeaderContext = createContext<HeaderContextInterface | undefined>(undefined);

interface HeaderProviderProps {
  headerIndex: number;
  children: ReactNode;
}

export const HeaderProvider: FC<HeaderProviderProps> = ({headerIndex, children}) => {
 
  const {headers} = useTable()
  const header = headers[headerIndex];
  
  return(
    <HeaderContext.Provider value={{header, headerIndex}}>
      {children}
    </HeaderContext.Provider>
  )

};

