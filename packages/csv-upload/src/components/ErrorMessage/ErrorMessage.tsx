import React from "react";
import useCell from "@hooks/useCell";


export interface ErrorMessageProps {
  classNames?: {
    root?: string
  }
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ classNames }) => {
  const { errorMsg, shouldDisplayErrorBox } = useCell();

  if (!shouldDisplayErrorBox) return (<></>)

  return (
    <div className={classNames?.root ?? ""}>
      {errorMsg}
    </div>
  );
};

export default ErrorMessage;


