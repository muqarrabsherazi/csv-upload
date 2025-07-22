import { FC, ReactNode } from "react";
import useParser from "@hooks/useParser";
import UploadFileButton from "../UploadFileButton"; 

export interface AddCSVButtonProps {
  children: ReactNode;  
}

const AddCSVButton: FC<AddCSVButtonProps> = ({children}) => {
  const upload = useParser();

  return (
    <UploadFileButton onUploadFile={upload}>
      {children}
    </UploadFileButton>
  );
};

export default AddCSVButton;
