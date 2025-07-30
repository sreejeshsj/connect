import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import HomeFeed from "./HomeFeed";
import Comment from "./Comment";
import Post from "./Post";
import Messages from "../components/Messages";
import UserProfile from "../pages/UserProfile";
import SearchFeed from "./SearchFeed";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home-feed" element={<HomeFeed />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/post" element={<Post />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/search" element={<SearchFeed />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
