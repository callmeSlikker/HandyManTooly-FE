import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./services/userService";
import useUserStore from "./store/useUserStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // To navigate after successful login
  const { fetchUserInfo } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError("กรุณากรอกอีเมล์และรหัสผ่าน");
      return;
    }

    setError(""); // Clear previous error

    try {
      const credentials = { email, password };
      await login(credentials);
      fetchUserInfo(false);
      navigate("/posts");
    } catch (err) {
      // Set error message for invalid login (incorrect password)
      setError("รหัสผ่านผิดพลาด");
    }
  };

  return (

    <form onSubmit={handleSubmit} className="login-container" style={{ background: "#1E90FF", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <img
        src="logoHandy.png"
        alt="Logo"
        style={{
          width: 250,
          height: "auto",
          display: "block",
        }}
      />
      <div className="input-group">
        <p
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          อีเมล์ผู้ใช้งาน
        </p>
        <label htmlFor="email"></label>
        <input
          style={{
            color: "black",
            backgroundColor: "#D9D9D9",
            fontSize: 16,
            border: "2px solid #D9D9D9",
            borderRadius: 10,
          }}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          required
        />
      </div>

      <div className="input-group">
        <p
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          รหัสผ่าน
        </p>
        <input
          style={{
            color: "black",
            backgroundColor: "#D9D9D9",
            fontSize: 16,
            border: "2px solid #D9D9D9",
            borderRadius: 10,
          }}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
          required
        />
      </div>

      {/* แสดงข้อความผิดพลาด */}
      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        style={{
          display: "block",
          color: "#1E90FF",
          backgroundColor: "#D9D9D9",
          fontSize: 16,
          fontWeight: 600,
          border: "2px solid #D9D9D9",
          borderRadius: 10,
          width: "fit-content",
          paddingLeft: 24,
          paddingRight: 24,
          marginTop: 24,
        }}
      >
        เข้าสู่ระบบ
      </button>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <p
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          สมัครสมาชิก
        </p>
      </Link>
    </form>
  );
};

export default Login;
