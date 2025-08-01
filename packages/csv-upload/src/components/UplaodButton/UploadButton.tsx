import { FC , ReactNode} from "react";
import useTable from "@hooks/useTable";
import useErrors from "@hooks/useErrors";

interface UploadButton{
    children: ReactNode; 
    classNames?: {
    root?: string
    button?: string;
  };
}

const UploadButton: FC<UploadButton> =({children, classNames}) => {
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
    <div className={classNames?.root ?? ""}>
        <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`${classNames?.button ?? ""} ${isDisabled ? "disabled" : ""}`}
        >
        Upload CSV
        </button>
    </div>
  
  );
};

export default UploadButton;
