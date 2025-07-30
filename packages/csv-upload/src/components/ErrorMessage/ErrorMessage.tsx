import React from "react";
import useTable from "@hooks/useTable";
import useCell from "@hooks/useCell";


export interface ErrorMessageProps {
  classNames?: {
    root?: string
  }
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ classNames }) => {
  const { errorMsg, shouldDisplayError } = useCell();

  if (!shouldDisplayError) return (<></>)

  return (
    <div
      style={{
        position: "absolute",
        background: "#f44336",
        color: "#fff",
        fontSize: "12px",
        padding: "4px 8px",
        borderRadius: "4px",
        zIndex: "10"
      }}
      className={classNames?.root ?? ""}
    >
      {errorMsg}
    </div>
  );
};

export default ErrorMessage;


