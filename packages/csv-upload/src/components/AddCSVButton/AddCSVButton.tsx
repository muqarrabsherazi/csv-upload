import useParser from "@hooks/useParser";
import { FC, ReactNode, ChangeEvent, useRef, CSSProperties } from "react";

export interface AddCSVButtonProps {
  children: ReactNode; 
  className?: string;
}


const AddCSVButton: FC<AddCSVButtonProps> = ({ children, className}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useParser(); 


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      upload(file);
      e.target.value = ""; 
    }
  };

  return (
    <>
      <button
        className={className ?? ""}
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {children}
      </button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleChange}
        hidden={true}
      />
      
    </>

  );
};

export default AddCSVButton;
