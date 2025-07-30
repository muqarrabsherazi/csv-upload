import  {FC } from "react";
import { useErrors } from "@contexts/ErrorProvider"


export interface ErrorCountProps {
  className? : {
    root?: string
  }
}

const ErrorCount: FC<ErrorCountProps> = ({className}) => {
  const { errors } = useErrors();
  const errorCount = Object.keys(errors).length;

  return (
    <div className={className?.root?? ""}>
      {errorCount > 0
        ? `${errorCount} error${errorCount > 1 ? "s" : ""} found`
        : "No errors"}
    </div>
  );
};

export default ErrorCount;