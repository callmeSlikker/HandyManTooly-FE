import React, { useState } from "react";
import BackButtonPage from "./BackButtonPage";


const PDPAAccount = () => {
  const [id, setID] = useState("");
  const [adress, setAdress] = useState("");
  const [anything, setAnything] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !adress) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setError("");
    alert("กรอกข้อมูลสำเร็จ!");
  };

  return (
    <div>
      <BackButtonPage />
      <img
        src="wonder.png"
        alt="wonder"
        style={{
          width: 160,
          height: "auto",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "50%",
        }}
      />

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginLeft: 48,
              marginTop: 32,
            }}
          >
            หมายเลขบัตรประชาชน
          </p>
          <input
            type="tel"
            placeholder="x-xxxx-xxxxx-xx-x"
            value={id}
            onChange={(e) => setID(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              marginLeft: 48,
              fontSize: 16,
              width: 300,
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
              marginLeft: 48,
              marginTop: 16,
            }}
          >
            ที่อยู่
          </p>
          <textarea
            type="text"
            placeholder="xxxxxxxxxxxxxxx"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            rows={3}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              marginLeft: 48,
              fontSize: 16,
              width: 300,
              paddingBlock: 16,
              border: "2px solid #D9D9D9",
              borderRadius: 10,
              resize: "none",
            }}
          />
        </div>
        <div className="input-group">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              marginLeft: 48,
              marginTop: 16,
            }}
          >
            ข้อมูลเพิ่มเติม
          </p>
          <textarea
            value={anything}
            onChange={(e) => setAnything(e.target.value)}
            style={{
              color: "black",
              backgroundColor: "#D9D9D9",
              marginLeft: 48,
              fontSize: 16,
              width: 300,
              padding: "10px",
              border: "2px solid #D9D9D9",
              borderRadius: 10,
            }}
         />
        </div>

        <button
          type="submit"
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: 30,
            color: "#1E90FF",
            backgroundColor: "#D9D9D9",
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

export default PDPAAccount;
