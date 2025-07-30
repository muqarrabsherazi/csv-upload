import { FC } from "react";
import { useTable } from "@contexts/TableProvider";
import { useErrors } from "@contexts/ErrorProvider";

interface UploadButton{

}

const UploadButton: FC<UploadButton> =({}) => {
    const {rows , onUploadClick} =useTable();
    const { errors } = useErrors();

    const hasErrors = Object.keys(errors).length > 0;
    const isDisabled = hasErrors || rows.length === 0;

    const handleClick = () => {
        if (!isDisabled) {
            onUploadClick(rows);
        }

    };

      return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: isDisabled ? "#ccc" : "#4CAF50",
        color: isDisabled ? "#666" : "white",
        border: "none",
        borderRadius: "5px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        transition: "all 0.2s ease-in-out"
      }}
    >
      Upload CSV
    </button>
  );
};

export default UploadButton;
