import React, { useState, cloneElement, isValidElement } from "react";
import { useErrors } from "@contexts/ErrorProvider";
import serializeCoords from "@utils/serializeCoords";
import { Coords } from "types";

interface ErrorMessageProps {
  coords: Coords;
  children?: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ coords, children }) => {
  const { errors } = useErrors();
  const key = serializeCoords(coords);
  const message = errors[key];

  const [isHovered, setIsHovered] = useState(false);

  if (!message) return <>{children}</>;

  const tooltip = (
    <div
      style={{
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#ff4d4f",
        color: "white",
        padding: "4px 8px",
        fontSize: "12px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {message}
    </div>
  );

  return (
    
    <span style={{ position: "relative", display: "inline-block", width: "100%" }}>
      {isValidElement(children)
        ? cloneElement(children as React.ReactElement, {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
          })
        : <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ display: "inline-block", width: "100%" }}
          >
            {children}
          </span>
      }
      {isHovered ? tooltip: null}
    </span>
  );
};

export default ErrorMessage;