import React from "react";

const LoadingSpinner = () => {
  return (
    <div style={styles.spinner}></div>
  );
};

const styles = {
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTop: "5px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Keyframes for animation (inline CSS doesn't support keyframes, so add this in a CSS file)
const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = spinnerStyles;
document.head.appendChild(styleSheet);

export default LoadingSpinner;
