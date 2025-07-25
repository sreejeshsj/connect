import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [postId, setPostId] = useState("");
  const [image, setImage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [fetchedPost, setFetchedPost] = useState([]);
  const navigate = useNavigate();
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
  const likeHandler=async(postId)=>{
    try {
      const response= await axios.post(`${backendUrl}/api/post/likeToggle/${postId}`,{},{headers:{token}})
      if(response.data.success){
        setLikedPosts(prev=>({...prev,[postId]:!prev[postId]}))
        fetchPost()
      }
    } catch (error) {
      console.log("Error")
    }
  }

  
  const value = {
    backendUrl,
    navigate,
    token,
    setPostId,
    postId,
    image,
    setImage,
    likeHandler,
    fetchPost,
    fetchedPost, 
    setFetchedPost,
    likedPosts
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
