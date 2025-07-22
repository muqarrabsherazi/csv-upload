import { FC, ReactNode, ChangeEvent, useRef } from "react";

export interface UploadFileButtonProps {
  onUploadFile: (file: File) => void | Promise<void>;
  children: ReactNode; 
}

const UploadFileButton: FC<UploadFileButtonProps> = ({ onUploadFile, children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      e.target.value = ""; // Reset to allow same file again
    }
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        {children}
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
};

export default UploadFileButton;
