import React from "react";
import { Link } from "react-router-dom";

const Loading = () => {
  return (
    <div>
      <img
        src="logoHandy.png"
        alt="logoHandy"
        style={{
          width: 400,
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "50%",
        }}
      />
      <p
        style={{
          textAlign: "center",
          marginTop: 10,
          color: "#FFFFFF",
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 100,
        }}
      >
        Handyman to Toolly
      </p>
    </div>
  );
};

export default Loading;
