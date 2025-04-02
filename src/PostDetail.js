import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access postId from the URL
import { getPostById } from "./services/postService";
import useUserStore from "./store/useUserStore";
import BackButtonPage from "./BackButtonPage";
import LoadingIndicator from "./components/LoadingIndicator";
import StarRating from "./components/StarRating";

const PostDetail = () => {
  const { postId } = useParams(); // Extract postId from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useUserStore();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        setPost(postData.data); // Assuming response has the 'data' property
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch post details.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <LoadingIndicator />;
  if (error) return <p>{error}</p>;

  return (
    <>
      {post && userInfo && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <BackButtonPage />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
            <img
              src={userInfo.imageUrl}
              alt={userInfo.imageUrl}
              style={{
                width: 75,
                aspectRatio: "1/1",
                display: "block",
                borderRadius: "50%",
                background: "#D9D9D9"
              }}
            />
            <h3 style={{ borderRadius: 10, background: "#D9D9D9", padding: 10, width: "100%" }}>{post.title}</h3>
          </div>
          <div
            className="post_box"
            style={{ gap: 12, backgroundColor: "#D9D9D9", flex: 1 }}
          >
            <div className="pic_job">
              <img src={post.imageUrl} alt="Job" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="box_address_container" style={{ flexWrap: "wrap" }}>
                <div className="box_address">
                  <a>{post.province.nameTH}</a>
                </div>
                <div className="box_address">
                  <a>{post.amphure.nameTH}</a>
                </div>
                <div className="box_address">
                  <a>{post.tambon.nameTH}</a>
                </div>
              </div>
              <div className="box_price">
                <a>
                  ${post.minimumPrice} - {post.maximumPrice} ฿
                </a>{" "}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: "25%" }}>
                <a href={userInfo._id === post.userId._id ? "/myreview" : `/users/${post.userId._id}`}>
                  <img
                    src={post.userId.imageUrl}
                    alt={post.userId.imageUrl}
                    style={{
                      width: "100%",
                      display: "block",
                      borderRadius: "50%",
                      aspectRatio: "1/1",
                      background: "white"
                    }}
                  />
                </a>
              </div>
              <div style={{ width: "75%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 4 }}>
                  <span style={{ textAlign: "left", fontWeight: "bold", fontSize: 20 }}>{post.userId.name}</span>
                  <StarRating averageReview={post.averageReview} />
                  <span style={{ textAlign: "left", fontWeight: "bold" }}>{post.description}</span>
                  {post.services.map((service, index) => (
                    <span key={index}>
                      <span style={{ color: "black", fontWeight: "bold" }}>✔</span> {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span style={{ textAlign: "left", color: "black", fontWeight: "bold" }}>📞 ติดต่อเรา : {post.userId.phone}</span>

          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
