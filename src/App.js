import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginorRegister from "./LoginorRegister"; // This will be the default screen with buttons for Login/Register
import Login from "./Login"; // Your Login component
import Register from "./Register"; // Your Register component
import Post from "./Post";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import FullAccount from "./FullAccount";
import Account from "./Account";
import MyReview from "./MyReview";
import MyPost from "./MyPost";
import PublicRoute from "./routes/PublicRoute";
import useUserStore from "./store/useUserStore";
import LoadingIndicator from "./components/LoadingIndicator";
import UserDetail from "./UserDetail";
import PrivateRoute from "./routes/PrivateRoute";
import Review from "./Review";


function App() {
  const { fetchUserInfo, isLoading } = useUserStore();

  useEffect(() => {
    fetchUserInfo(false); // Fetch user info when the component loads
  }, [fetchUserInfo]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Router>
      <div
        className="App"
        style={{
          background: "#1E90FF",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Routes>
          <Route path="/" element={<PublicRoute element={<LoginorRegister />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />

          <Route path="/posts" element={<PrivateRoute element={<Post />} />} />
          <Route path="/posts/:postId" element={<PrivateRoute element={<PostDetail />} />} />
          <Route path="/users/:userId" element={<PrivateRoute element={<UserDetail />} />} />
          <Route path="/createpost" element={<PrivateRoute element={<CreatePost />} />} />
          <Route path="/account" element={<PrivateRoute element={<Account />} />} />
          <Route path="/fullaccount" element={<PrivateRoute element={<FullAccount />} />} />
          <Route path="/myreview" element={<PrivateRoute element={<MyReview />} />} />
          <Route path="/mypost" element={<PrivateRoute element={<MyPost />} />} />
          <Route path="/review/:userId" element={<PrivateRoute element={<Review />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
