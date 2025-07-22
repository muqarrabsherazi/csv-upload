import { FC, ReactNode } from "react";
import useCSVUpload from "@hooks/useCSVUpload";
import UploadFileButton from "../UploadFileButton"; 

export interface AddCSVButtonProps {
  children: ReactNode;  
}

const AddCSVButton: FC<AddCSVButtonProps> = ({children}) => {
  const upload = useCSVUpload();

  return (
    <UploadFileButton onUploadFile={upload}>
      {children}
    </UploadFileButton>
  );
};

export default AddCSVButton;
