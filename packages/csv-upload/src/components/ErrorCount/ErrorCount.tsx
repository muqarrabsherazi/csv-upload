import React from "react";
import { useErrors } from "@contexts/ErrorProvider"


export interface ErrorCountProps {}

const ErrorCount: React.FC<ErrorCountProps> = () => {
  const { errors } = useErrors();
  const errorCount = Object.keys(errors).length;

  return (
    <div>
      {errorCount > 0
        ? `${errorCount} error${errorCount > 1 ? "s" : ""} found`
        : "No errors"}
    </div>
  );
};

export default ErrorCount;