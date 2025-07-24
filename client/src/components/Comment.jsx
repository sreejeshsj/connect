import { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import assets from "../assets/assets";
import EmojiPicker from "emoji-picker-react";

function Comment() {
  const { postId, backendUrl, token, image } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const getComments = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/fetch-comment`,
        { postId },
        { headers: { token } }
      );
      if (response.data.success) {
        setComments(response.data.comment);
        console.log(response.data.comment);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleEmojiClick = (emojidata) => {
    setComment((prev) => prev + emojidata.emoji);
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

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-screen">
      <div className="w-full sm:w-full p-4 sm:sticky sm:top-4 h-fit bg-white">
        {image && <PostCard image={image} />}
      </div>

      <div className="w-full mb-10 sm:w-2/3 p-4 mt-10 flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col px-4 py-3 bg-white rounded-lg shadow w-full"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  className="w-6 h-6 rounded-full"
                  src={comment.userId.profilePicture}
                  alt=""
                />
                <p className="font-semibold">{comment.userId.name}</p>
              </div>
              <p className="text-sm text-gray-700">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        <div className="flex flex-col m-5">
          <div className="flex items-center gap-2">
            <input
              className="px-5 py-2 border rounded-lg outline-none w-full"
              type="text"
              placeholder="Comment Here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😊
            </button>

            <img
              onClick={addComment}
              className="w-5 h-5 cursor-pointer"
              src={assets.send_icon}
              alt="Send"
            />
          </div>

          {showEmojiPicker && (
            <div className="mt-2 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
