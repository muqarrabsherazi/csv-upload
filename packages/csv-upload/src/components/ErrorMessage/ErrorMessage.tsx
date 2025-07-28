import React from "react";
import { useTable } from "@contexts/TableProvider";
import { useCell } from "@contexts/CellProvider";

export interface ErrorMessageProps {
  className?: {
    root?: string
    messageBox?: string
  }
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({className})  => {
  const { hoverCellCoords } = useTable();
  const { coords, errorMsg } = useCell();
  
    const isHovered =
    hoverCellCoords &&
    hoverCellCoords.row === coords.row &&
    hoverCellCoords.col === coords.col;


    return (
    <div className={className?.root?? "" } style={{ position: "relative" }}>
      {isHovered && errorMsg && (
        <div
          style={{
            position: "absolute",
            // top: "-25px",
            background: "#f44336",
            color: "#fff",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "4px",
            zIndex: "10"
          }}
          className={className?.messageBox ?? ""}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;


 