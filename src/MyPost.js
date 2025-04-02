import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "./services/postService"; // Import API call for fetching posts
import {
  getProvinces,
  getAmphures,
  getTambons,
} from "./services/locationService"; // Import location API calls
import "./App.css";
import useUserStore from "./store/useUserStore";
import LoadingIndicator from "./components/LoadingIndicator";
import StarRating from "./components/StarRating";
import LoadingSpinner from "./components/LoadingSpinner";
import { getMe } from "./services/userService";
import BackButtonPage from "./BackButtonPage";

const MyPost = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [jobPosts, setJobPosts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [error, setError] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedAmphure, setSelectedAmphure] = useState(null);
  const [selectedTambon, setSelectedTambon] = useState(null);
  const [query, setQuery] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {};

      if (selectedProvince) params.provinceId = selectedProvince;
      if (selectedAmphure) params.amphureId = selectedAmphure;
      if (selectedTambon) params.tambonId = selectedTambon;

      const response = await getMe(params);
      setJobPosts(response.posts);
    } catch (err) {
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingLocations(true);
      try {
        const response = await getProvinces();
        setProvinces(response.data);
      } catch (err) {
        setError("Failed to fetch provinces.");
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchProvinces();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchAmphures = async () => {
        setLoadingLocations(true);
        try {
          const response = await getAmphures(selectedProvince);
          setAmphures(response.data);
        } catch (err) {
          setError("Failed to fetch amphures.");
        } finally {
          setLoadingLocations(false);
        }
      };
      fetchAmphures();
    }
  }, [selectedProvince]);

  // Fetch tambons when an amphure is selected
  useEffect(() => {
    if (selectedAmphure) {
      const fetchTambons = async () => {
        setLoadingLocations(true);
        try {
          const response = await getTambons(selectedProvince, selectedAmphure);
          setTambons(response.data);
        } catch (err) {
          setError("Failed to fetch tambons.");
        } finally {
          setLoadingLocations(false);
        }
      };
      fetchTambons();
    }
  }, [selectedAmphure]);

  // Fetch posts based on selected location filters
  useEffect(() => {
    if (selectedProvince && selectedAmphure && selectedTambon) {
      fetchPosts();
    }
  }, [selectedProvince, selectedAmphure, selectedTambon]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const { userInfo } = useUserStore();

  if (loading || !userInfo) return <LoadingIndicator />;;
  if (error) return <p>{error}</p>;

  const filteredPosts = query
    ? jobPosts.filter(post =>
      post?.description?.includes(query) ||
      post?.title?.includes(query) ||
      post?.userId?.name?.includes(query) ||
      post?.userId?.email?.includes(query)
    )
    : jobPosts;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
      <a
        className="menu"
        href="/createpost"
        style={{
          width: "45.54px",
          height: "45.54px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          border: "2px solid gold",
          zIndex: "99"
        }}
      >
        <img
          src="add.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          alt="add"
        />
      </a>
      <BackButtonPage />
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 24 }}>
        {
          userInfo && (
            <button
              className="circle-image"
              onClick={() => navigate("/FullAccount")}
              style={{
                backgroundImage: `url(${userInfo.imageUrl})`,
                backgroundColor: "#D9D9D9",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%', // Adjust as needed
                border: 'none',
                borderRadius: '50%',
                padding: '0',
                aspectRatio: "1/1"
              }}
            >
              {/* Optional: Add content inside the button if needed */}
            </button>
          )
        }

        {/* Filters for Location */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหา"
          style={{
            color: "black",
            backgroundColor: "#FFFFFF",
            fontSize: 16,
            width: "100%",
            padding: 12,
            border: "2px solid #D9D9D9",
            borderRadius: 10,
          }}
        />
      </div>
      {loadingLocations ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <LoadingSpinner />
        </div>
      ) : (<>
        <div className="province-filters">
          <select
            onChange={(e) => setSelectedProvince(e.target.value)}
            value={selectedProvince}
            style={{
              color: "black",
              backgroundColor: "#FFFFFF",
              marginLeft: 5,
              marginRight: 5,
              marginTop: 16,
              marginBottom: 16,
              fontSize: 16,
              width: "35%",
              paddingBlock: 6,
              border: "2px solid #D9D9D9",
              borderRadius: 5,
            }}
          >
            <option value="">เลือกจังหวัด</option>
            {provinces.map((province) => (
              <option key={province.provinceId} value={province.provinceId}>
                {province.nameTH}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedAmphure(e.target.value)}
            value={selectedAmphure}
            disabled={!selectedProvince}
            style={{
              color: "black",
              backgroundColor: "#FFFFFF",
              marginLeft: 5,
              marginRight: 5,
              marginTop: 16,
              marginBottom: 16,
              fontSize: 16,
              width: "35%",
              paddingBlock: 6,
              border: "2px solid #D9D9D9",
              borderRadius: 5,
            }}
          >
            <option value="">เลือกอำเภอ</option>
            {amphures.map((amphure) => (
              <option key={amphure.amphureId} value={amphure.amphureId}>
                {amphure.nameTH}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedTambon(e.target.value)}
            value={selectedTambon}
            disabled={!selectedAmphure}
            style={{
              color: "black",
              backgroundColor: "#FFFFFF",
              marginLeft: 5,
              marginRight: 5,
              marginTop: 16,
              marginBottom: 16,
              fontSize: 16,
              width: "30%",
              paddingBlock: 6,
              border: "2px solid #D9D9D9",
              borderRadius: 5,
            }}
          >
            <option value="">เลือกตำบล</option>
            {tambons.map((tambon) => (
              <option key={tambon.tambonId} value={tambon.tambonId}>
                {tambon.nameTH}
              </option>
            ))}
          </select>
        </div></>)}

      <div className="screensize_white">
        <div className="post-container">
          {filteredPosts.map((post) => (
            <button
              key={post._id}
              onClick={() => handlePostClick(post._id)}
              className="post_box"
            >
              <div className="pic_job">
                <img src={post.imageUrl} alt="Job" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <div className="title-price-address-container">
                  <div className="title">
                    <p>{post.title}</p>
                  </div>
                  <div className="box_price">
                    <a style={{ color: "#FFFFFF" }}>
                      {post.minimumPrice} - {post.maximumPrice} ฿
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="box_address_container">
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
