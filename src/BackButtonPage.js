import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const BackButtonPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: 16,
        background: "#1E90FF",
        display: "flex",
        alignItems: "center",
        paddingTop: 16,
        cursor: "pointer", // เพิ่ม cursor pointer เพื่อให้รู้ว่าคลิกได้
      }}
      onClick={() => navigate(-1)} // กดแล้วกลับไปหน้าก่อนหน้า
    >
      <AiOutlineLeft size={32} color="white" />
    </div>
  );
};

export default BackButtonPage;

