import { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import assets from "../assets/assets";
import EmojiPicker from "emoji-picker-react";

function Comment() {
  const {
    postId,
    setPostId,
    backendUrl,
    token,
    image,
    setImage,
    fetchedPost,
    filter,
    fetchPost,
    filterPost
  } = useContext(AppContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useEffect(() => {
   
    setPostId(localStorage.getItem("postId"));
    fetchPost()
    
  }, [token]);
  const getComments = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/fetch-comment`,
        { postId },
        { headers: { token } }
      );
      if (response.data.success) {
        setComments(response.data.comment);
        
      }
    } catch (error) {
      console.log("error");
    }
  };

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/comment/${postId}`,
        { comment },
        { headers: { token } }
      );
      if (response.data.success) {
        getComments();
        setComment("");
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [token, postId]);

  
  const handleEmojiClick = (emojidata) => {
    setComment((prev) => prev + emojidata.emoji);
  };
  useEffect(()=>{
    if(postId){
      
      filterPost(postId)
    }
    
  },[postId,fetchedPost])
  
  
  return (
 <div className="flex flex-col items-center justify-center lg:flex-row w-full min-h-screen gap-4 p-4 bg-gray-50">
  {/* PostCard Section */}
  <div className="w-full lg:w-1/3">
    {filter && (
      <PostCard
        image={filter?.image}
        liked={filter?.like}
        postId={filter?._id}
        dp={localStorage.getItem("dp")}
        like={filter?.like?.length}
        name={filter?.userId?.name}
      />
    )}
  </div>
 <div className="flex flex-col w-full lg:w-[25%] max-h-screen overflow-hidden">
  {/* Scrollable Comments List */}
  <div className="flex-1 overflow-y-auto pr-2 scroll-smooth scrollbar-hide">
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div
          key={comment._id}
          className="flex flex-col w-full px-4 py-3 bg-white rounded-lg shadow mb-2"
        >
          <div className="flex items-center gap-2 mb-2">
            <img
              className="w-6 h-6 rounded-full"
              src={comment.userId.profilePicture}
              alt="User"
            />
            <p className="font-semibold">{comment.userId.name}</p>
          </div>
          <p className="text-sm text-gray-700">{comment.comment}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No comments yet.</p>
    )}
  </div>

  {/* Sticky Comment Input */}
  <div className="bg-white w-full p-4 rounded-lg shadow">
    <div className="flex items-center gap-2">
      <input
        className="px-4 py-2 border rounded-lg outline-none flex-1"
        type="text"
        placeholder="Comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="text-xl"
      >
        😊
      </button>
      <img
        onClick={addComment}
        className="w-6 h-6 cursor-pointer"
        src={assets.send_icon}
        alt="Send"
      />
    </div>

    {showEmojiPicker && (
      <div className="z-50 mt-2">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    )}
  </div>
</div>
  
</div>

  );
}

export default Comment;
