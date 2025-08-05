import { FC, ReactNode } from "react";
import useTable from "@hooks/useTable";
import useErrors from "@hooks/useErrors";

export interface UploadButtonProps {
  children: ReactNode
  classNames?: {
    root?: string
  }
}

const UploadButton: FC<UploadButtonProps> = ({ children, classNames }) => {
  const { rows, lastChangedRow, onUploadClick } = useTable();
  const { errors } = useErrors();

  const hasErrors = Object.keys(errors).length > 0;
  const isDisabled = hasErrors || rows.length === 0;

  const handleClick = () => {
    if (!isDisabled) {
      onUploadClick(rows, lastChangedRow ?? 0);
    }

  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={classNames?.root ?? ""}
    >
      {children}
    </button>
  );
};

export default UploadButton;
