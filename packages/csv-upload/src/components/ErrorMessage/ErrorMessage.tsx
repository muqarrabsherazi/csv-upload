import React, { useState, cloneElement, isValidElement } from "react";
import { useErrors } from "@contexts/ErrorProvider";
import serializeCoords from "@utils/serializeCoords";
import { Coords, CSVCellData } from "types";
import { useTable } from "@contexts/TableProvider";

interface ErrorMessageProps {
  cellData: CSVCellData;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ cellData })  => {
  const { hoverCellCoords } = useTable();
  const { coords, errorMsg } = cellData.props;
  
    const isHovered =
    hoverCellCoords &&
    hoverCellCoords.row === coords.row &&
    hoverCellCoords.col === coords.col;

    return (
    <div style={{ position: "relative" }}>
      {isHovered && errorMsg && (
        <div
          style={{
            position: "absolute",
            top: "-25px",
            background: "#f44336",
            color: "#fff",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;


 