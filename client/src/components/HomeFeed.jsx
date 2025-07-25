import PostCard from "./PostCard";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
function HomeFeed() {
  const { backendUrl, token,fetchPost,fetchedPost, setFetchedPost } = useContext(AppContext);
  
  
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
              like={post.like?.length}
              dp={post.userId.profilePicture}
            />
          ))
        : ""}

      <Footer />
    </div>
  );
}

export default HomeFeed;
