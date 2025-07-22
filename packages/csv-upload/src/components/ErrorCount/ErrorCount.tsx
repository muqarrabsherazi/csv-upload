import React from "react";
import { useErrors } from "../../contexts/ErrorProvider"

const ErrorCount: React.FC = () => {
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