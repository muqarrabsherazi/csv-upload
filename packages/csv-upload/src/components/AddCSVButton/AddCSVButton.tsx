import { FC } from "react";
import useCSVUpload from "@hooks/useCSVUpload";
import UploadFileButton from "../UploadFileButton"; 

export interface AddCSVButtonProps {}

const AddCSVButton: FC<AddCSVButtonProps> = () => {
  const upload = useCSVUpload();

  return (
    <UploadFileButton onUploadFile={upload}>
      Add CSV
    </UploadFileButton>
  );
};

export default AddCSVButton;
