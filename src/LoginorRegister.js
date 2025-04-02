import React from 'react';
import { Link } from 'react-router-dom';

const LoginorRegister = () => {
  return (
    <div >
      <img
        src="people.png"
        alt="people"
        style={{
          width: 160,
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "50%", 
        }}
      />

      {/* ปุ่มไปหน้า Login */}
      <Link to="./login" style={{textDecoration: 'none'}}>
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
          }}
        >
          ลงทะเบียน
        </button>
      </Link>

      {/* ปุ่มไปหน้า Register */}
      <Link to="./register" style={{textDecoration: 'none'}}>
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
            marginBottom: 100,
          }}
        >
          สมัครสมาชิก
        </button>
      </Link>
    </div>
  );
};

export default LoginorRegister;
