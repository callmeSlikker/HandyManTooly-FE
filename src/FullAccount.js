import BackButtonPage from "./BackButtonPage";
import { Link } from "react-router-dom";
import useUserStore from "./store/useUserStore";

const FullAccount = () => {
  const { userInfo, logout } = useUserStore();

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
          <BackButtonPage />
          <div style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            position: "relative"
          }}>
            <img
              src={userInfo.imageUrl}
              alt={userInfo.imageUrl}
              style={{
                width: 160,
                height: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
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
            <div
              style={{
                backgroundColor: "#D9D9D9",
                display: "flex",
                flexDirection: "column",
                borderRadius: 10,
                height: "100%",
                paddingLeft: 25,
                paddingRight: 25,
                flex: 1,
              }}
            >
              <Link
                to="/account"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none"
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 600,
                    marginTop: 32,
                  }}
                >
                  ข้อมูลส่วนตัว
                </p>
                <p>&gt;</p>
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 25,
                  paddingRight: 25,
                  height: 2,
                  backgroundColor: "#A0ADBA",
                  textDecoration: "none"
                }}
              ></div>
              <Link
                to="/mypost"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none"
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 600,
                    marginTop: 32,
                  }}
                >
                  โพสต์ของฉัน
                </p>
                <p>&gt;</p>
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 25,
                  paddingRight: 25,
                  height: 2,
                  backgroundColor: "#A0ADBA",
                  textDecoration: "none"
                }}
              ></div>
              <Link
                to="/myreview"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none"
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: 600,
                    marginTop: 32,
                  }}
                >
                  รีวิวการทำงาน
                </p>
                <p>&gt;</p>
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 25,
                  paddingRight: 25,
                  height: 2,
                  backgroundColor: "#A0ADBA",
                  textDecoration: "none"
                }}
              ></div>
              <Link
                to="/login"
                onClick={logout}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "black",
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 32,
                  textDecoration: "none",
                  cursor: "pointer",
                  textDecoration: "none"
                }}
              >
                ออกจากระบบ
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullAccount;
