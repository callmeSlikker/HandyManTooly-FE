import React, { useState } from "react";
import { register } from "./services/userService";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage";
import LoadingIndicator from "./components/LoadingIndicator";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return setError("กรุณากรอกชื่อผู้ใช้งาน");
    if (!email) return setError("กรุณากรอกอีเมล");
    if (!phone) return setError("กรุณากรอกหมายเลขโทรศัพท์");
    if (!password) return setError("กรุณากรอกรหัสผ่าน");
    if (!confirmPassword) return setError("กรุณายืนยันรหัสผ่าน");

    // Check if passwords match
    if (password !== confirmPassword) return setError("รหัสผ่านไม่ตรงกัน");

    setLoading(true)
    setError(""); // Clear any previous errors

    try {
      // Call register API with the user's data
      const userData = { name, email, phone, password, confirmPassword };
      await register(userData); // API call to register
      navigate("/login"); // Navigate to login page

    } catch (err) {
      setError("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingIndicator />;;

  return (
    <div>
      <img
        src="logoHandy.png"
        alt="Logo"
        style={{
          width: 250,
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 0,
            }}
          >
            ชื่อผู้ใช้งาน
          </p>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              width: "100%",
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        {/* ช่องกรอกหมายเลขโทรศัพท์ */}
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            หมายเลขโทรศัพท์
          </p>
          <input
            type="tel"
            placeholder=""
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              width: "100%",
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
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
              width: "100%",
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            รหัสผ่าน
          </p>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              width: "100%",
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
            }}
          >
            ยืนยันรหัสผ่าน
          </p>
          <input
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              fontSize: 16,
              width: "100%",
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
          />
        </div>

        <ErrorMessage message={error} />

        <button
          type="submit"
          style={{
            display: 'block',
            margin: '0 auto',
            marginTop: 30,
            color: '#1E90FF',
            backgroundColor: '#D9D9D9',
            fontSize: 16,
            fontWeight: 600,
            width: 130,
            paddingBlock: 5,
            border: "2px solid #D9D9D9",
            borderRadius: 10,
            marginBottom: 50,
          }}
        >
          ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Register;
