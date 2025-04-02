import BackButtonPage from "./BackButtonPage";
import StarRating from "./components/StarRating";
import useUserStore from "./store/useUserStore";

const MyReview = () => {
  const { userInfo } = useUserStore();

  return (
    <>
      {
        userInfo && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

            <BackButtonPage
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
              }}
            />
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  margin: 8,
                }}
              >
                {userInfo.name}
              </p>

              <div style={{ display: "flex", fontSize: 48, justifyContent: 'center', alignItems: 'center', gap: 12, color: "white" }}>
              <span>{userInfo.averageReview?.toFixed(2)}</span>
                <span
                  className="filled-star"
                >
                  ★
                </span>
              </div>

              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                คำอธิบายการทำงาน
              </p>

              <div
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: 10,
                  width: "80%",
                  maxWidth: 500,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {userInfo.reviews.map(review => (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <a href={`/users/${review.reviewerId}`}>
                        <img
                          src={review.reviewerImage}
                          alt={review.reviewerImage}
                          style={{
                            width: 56,
                            height: "auto",
                            borderRadius: "50%",
                            margin: 6,
                            background: "white"
                          }}
                        />
                      </a>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start", // ทำให้เนื้อหาชิดซ้าย
                        }}
                      >
                        <p
                          style={{
                            color: "black",
                            fontSize: 16,
                            margin: 0, // เอา margin ออกให้ชิดซ้าย
                            lineHeight: 1.2, // ปรับให้ไม่ติดกันเกินไป
                          }}
                        >
                          {review.reviewerName}
                        </p>
                        <StarRating averageReview={review.rating} />
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 16,
                        marginLeft: 8,
                        textAlign: "left", // ชิดซ้าย
                      }}
                    >
                      {review.review}
                    </p>
                  </>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default MyReview;
