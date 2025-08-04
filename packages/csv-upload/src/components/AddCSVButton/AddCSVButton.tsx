import useParser from "@hooks/useParser";
import { FC, ReactNode, ChangeEvent, useRef, CSSProperties } from "react";

export interface AddCSVButtonProps {
  children: ReactNode; 
  classNames?: {
    root?: string
    button?: string;
    input?: string;
  };
}


const AddCSVButton: FC<AddCSVButtonProps> = ({ children, classNames}) => {
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
    <div className={classNames?.root ?? ""}>
      <button
        className={classNames?.button?? ""}
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
      
    </div>

  );
};

export default AddCSVButton;
