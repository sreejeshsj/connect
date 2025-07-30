import { useContext } from "react";
import { FaShare } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { Heart, MessageCircle } from "lucide-react";
function PostCard(props) {
  const {
    navigate,
    setPostId,
    setImage,
    likeHandler,
    likedPosts,
    setUserId,
    fetchUserDetails,
  } = useContext(AppContext);

  return (
    <div className="bg-white rounded-lg shadow mb-6 w-full max-w-md mx-auto">
      <div className="flex mt-5 mb-5 ">
        <img
          onClick={() => {
            localStorage.setItem("selectedUserId", props.userId);
            navigate("/user-profile");
          }}
          className="w-8 h-8 rounded-full m-2"
          src={props.dp}
          alt=""
        />
        <p className="font-medium text-sm sm:text-base m-2">{props.name}</p>
      </div>
      <img className="w-full" src={props.image} alt="" />
      <div className="flex gap-6 justify-start mt-4 mb-3 ml-2  ">
        <Heart
          onClick={() => likeHandler(props.postId)}
          className={`${
            likedPosts[props.postId] ? "text-red-500 fill-red-500" : ""
          }hover:text-red-500 cursor-pointer`}
        />
        <MessageCircle
          onClick={() => {
            setPostId(props.postId);
            setImage(props.image);
            navigate("/comment");
          }}
          className="hover:text-blue-500 cursor-pointer "
        />
        <FaShare />
      </div>
      <p className="text-gray-400">{props.like} Likes</p>
      <p>{props.caption}</p>
    </div>
  );
}

export default PostCard;
