import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Heart, MessageCircle } from "lucide-react";

function UserPost(props) {
  const { setPostId, setImage, navigate, likeHandler, likedPosts } =
    useContext(AppContext);

  return (
    <div className="relative group w-full sm:w-[300px] h-[300px] sm:h-[300px] overflow-hidden rounded-xl bg-white shadow-md cursor-pointer">
      {/* Post Image */}
      <img
        className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
        src={props.image}
        alt=""
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex gap-8 text-white text-2xl">
          <Heart
            onClick={() => likeHandler(props.postId)}
            className={`${
              likedPosts[props.postId]
                ? "text-red-500 fill-red-500"
                : "text-white"
            } hover:scale-110 transition`}
          />
          <MessageCircle
            onClick={() => {
              setImage(props.image);
              setPostId(props.postId);
              navigate("/comment");
            }}
            className="hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default UserPost;
