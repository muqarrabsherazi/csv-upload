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
  const [isHovered, setIsHovered] = useState(false);

  if (!message) return <>{children}</>;

  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ff4d4f",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
