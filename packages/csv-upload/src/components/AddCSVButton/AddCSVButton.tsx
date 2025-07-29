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

  

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      upload(file);
      e.target.value = ""; // Reset to allow same file again
    }
  };

  return (
    <div className={classNames?.root ?? ""}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        Add CSV
      </button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleChange}
        className={classNames?.input ?? ""}
        style={{ display: "none" }} // <-- hides the file input
      />
    </div>

  );
};

export default AddCSVButton;
