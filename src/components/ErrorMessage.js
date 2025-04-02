import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        color: "red",
        fontSize: "16px",
        marginTop: 32,
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
