import  {FC } from "react";
import useErrors from "@hooks/useErrors";


export interface ErrorCountProps {
  className?: string
}

const ErrorCount: FC<ErrorCountProps> = ({className}) => {
  const { errors } = useErrors();
  const errorCount = Object.keys(errors).length;

  return (
    <div className={className ?? ""}>
      {errorCount > 0 && `${errorCount} error${errorCount > 1 ? "s" : ""} found`}
    </div>
  );
};

export default ErrorCount;