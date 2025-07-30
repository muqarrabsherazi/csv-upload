import React, { useState,  useEffect, useMemo, ReactNode } from "react";
import useErrors  from "@hooks/useErrors"
import deserializeCoords from "@utils/deserializeCoords";
import useTable from "@hooks/useTable";


export interface JumpToFirstErrorProps {
  classNames? : {
    button?: string
  }
  children: ReactNode
}

const JumpToFirstError: React.FC<JumpToFirstErrorProps> = ({classNames, children}) => {
  const { errors } = useErrors();
  const {inputCellCoords, inputCellRef, setInputCellCoords} = useTable();
  const [scroll, setScoll] = useState<boolean>(false)

  const errorCells = useMemo(() => Object.keys(errors).map(deserializeCoords), [errors]); 


  const onClick = (e:React.MouseEvent) => {
    e.stopPropagation();
    if (errorCells.length === 0) return;
    setInputCellCoords(errorCells[0]);
    setScoll(true);
  }

  useEffect(() => {
    if (!scroll || inputCellCoords == null) 
      
    inputCellRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
    setScoll(false);
  }, [inputCellCoords, scroll])

  return (
    <button className={classNames?.button?? "" } onClick={onClick}>
      {children} 
    </button>
  );
};

export default JumpToFirstError;