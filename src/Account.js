import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButtonPage from "./BackButtonPage";
import useUserStore from "./store/useUserStore";
import { updateUser } from "./services/userService";

const Account = () => {
  const { userInfo } = useUserStore();
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const navigate = useNavigate();
  const { fetchUserInfo } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, phone };
    await updateUser(userData);
    fetchUserInfo(true);
    navigate("/FullAccount"); // นำทางหลังจากส่งฟอร์ม
  };


  return (
    <>
      {userInfo && (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <BackButtonPage
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1000,
            }}
          />
          <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}>
            <img
              src={userInfo.imageUrl}
              alt={userInfo.imageUrl}
              style={{
                width: 160,
                height: "auto",
                display: "block",
                margin: "60px auto 0",
                borderRadius: "50%",
                background: "#D9D9D9"
              }}
            />
            <p
              style={{
                color: "#FFFFFF",
                fontSize: 32,
                fontWeight: 700,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                margin: 8,
              }}
            >
              {userInfo.name}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <p style={styles.label}>ชื่อผู้ใช้งาน</p>
                <input
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div className="input-group">
                <p style={styles.label}>หมายเลขโทรศัพท์</p>
                <input
                  type="tel"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div className="input-group">
                <p style={styles.label}>อีเมล์ผู้ใช้งาน</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.button}>
                ยืนยัน
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

// สไตล์รวม
const styles = {
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 16,
  },
  input: {
    color: "black",
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    width: "100%",
    paddingBlock: 16,
    border: "2px solid #D9D9D9",
    borderRadius: 10,
  },
  button: {
    display: "block",
    margin: "30px auto 50px",
    color: "#1E90FF",
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontWeight: 600,
    width: 130,
    paddingBlock: 5,
    border: "2px solid #D9D9D9",
    borderRadius: 10,
  },
};

export default Account;
