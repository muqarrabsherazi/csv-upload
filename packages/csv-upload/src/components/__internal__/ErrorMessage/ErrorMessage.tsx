import React, { useState } from "react";
import { useErrors } from "@contexts/ErrorProvider";
import serializeCoords from "@utils/makeKey";
import { Coords } from "types";

interface ErrorMessageProps {
  coords: Coords;
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ coords, children }) => {
  const { errors } = useErrors();
  const key = serializeCoords(coords);
  const message = errors[key];

  console.log("Checking tooltip for", key, "=>", message);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      {message && (
        <span style={{
          position: "absolute",
          top: "-30px",
          left: "0",
          backgroundColor: "black",
          color: "white",
          padding: "4px",
          fontSize: "10px",
          zIndex: 10000,
        }}>
          {message}
        </span>
      )}
    </span>
  );
};
export default ErrorMessage;
