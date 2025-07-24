import PostCard from "./PostCard";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
function HomeFeed() {
  const { backendUrl, token } = useContext(AppContext);
  const [fetchedPost, setFetchedPost] = useState([]);
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
  useEffect(() => {
    if (token) {
      fetchPost();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center">
      {fetchedPost.length > 0
        ? fetchedPost.map((post, index) => (
            <PostCard
              key={index}
              postId={post._id}
              caption={post.caption}
              image={post.image}
              name={post.userId.name}
              dp={post.userId.profilePicture}
            />
          ))
        : ""}

      <Footer />
    </div>
  );
}

export default HomeFeed;
