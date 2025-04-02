import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingIndicator = () => {
  return (
    <div style={styles.overlay}>
      <LoadingSpinner />
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1E90FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensures it's on top
  },
};

export default LoadingIndicator;
