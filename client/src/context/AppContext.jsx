import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [followingUser, setFollowingUser] = useState([]);
  const [postId, setPostId] = useState("");
  const [image, setImage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fetchedPost, setFetchedPost] = useState([]);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [showProfilePicEdit,setShowProfilePicEdit]=useState(false)
  const [showPostEdit,setShowPostEdit]=useState(false)
  const [postDetails,setPostDetails]=useState({
    id:"",
    caption:"",
    image:""
  })
  const [user, setUser] = useState({
    name: "",
    profilePicture: "",
    bio: "",
    followers: [],
    following: [],
  });
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/getuser`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getAlFollowingUser = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/user/get-following-user`,
        { headers: { token } }
      );
      if (response.data.success) {
        setFollowingUser(response.data.followingUserlist);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/post/fetch`, {
        headers: { token },
      });
      if (response.data.success) {
        setFetchedPost(response.data.post);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const likeHandler = async (postId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/likeToggle/${postId}`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
        fetchPost();
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleEmojiClick = (emojidata) => {
    setComment((prev) => prev + emojidata.emoji);
    setMessage((prev) => prev + emojidata.emoji);
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/get-user-profile`,
        { userId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        setUserDetails(response.data.userData);
      }
    } catch (error) {
      console.log("error");
    }
  };

  
  const value = {
    backendUrl,
    navigate,
    token,
    setToken,
    setPostId,
    postId,
    image,
    setImage,
    likeHandler,
    fetchPost,
    fetchedPost,
    setFetchedPost,
    likedPosts,
    getUserDetails,
    user,
    setUser,
    getAlFollowingUser,
    followingUser,
    handleEmojiClick,
    comment,
    setComment,
    showEmojiPicker,
    setShowEmojiPicker,
    message,
    setMessage,
    userId,
    setUserId,
    userDetails,
    setUserDetails,
    fetchUserDetails,
    showProfilePicEdit,
    setShowProfilePicEdit,
    showPostEdit,setShowPostEdit,
    postDetails,setPostDetails
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
