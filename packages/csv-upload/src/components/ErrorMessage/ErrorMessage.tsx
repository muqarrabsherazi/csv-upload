import React from "react";
import useCell from "@hooks/useCell";


export interface ErrorMessageProps {
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className }) => {
  const { errorMsg } = useCell();

  return (
    <div className={className ?? ""}>
      {errorMsg}
    </div>
  );
};

export default ErrorMessage;


