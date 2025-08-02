import React, { useEffect, useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function EditPost() {
  const { setShowPostEdit, postDetails, backendUrl, token } =
    useContext(AppContext);

  const [newCaption, setNewCaption] = useState("");
  const [image, setImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", newCaption);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/update/${postDetails.id}`,
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        setShowPostEdit(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewCaption((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    setNewCaption(postDetails.caption);
  }, [postDetails.caption]);

  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center px-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-4 sm:p-8 rounded-xl text-slate-500 flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl"
      >
        {/* Image Upload and Preview */}
        <label htmlFor="imageInput" className="cursor-pointer">
          <img
            className="w-64 h-64 sm:w-[500px] sm:h-[400px] object-cover rounded"
            src={image ? URL.createObjectURL(image) : postDetails.image}
            alt="post preview"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            type="file"
            id="imageInput"
          />
        </label>

        {/* Caption and Emoji Picker */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full relative">
            <input
              onChange={(e) => setNewCaption(e.target.value)}
              value={newCaption}
              type="text"
              className="border border-gray-300 rounded w-full p-3 mb-2 outline-none"
              placeholder="Write here..."
            />
            {/* Emoji Toggle Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="absolute top-3 right-3 text-xl"
            >
              😊
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute z-10 right-0 bottom-full mb-2 sm:top-full sm:bottom-auto sm:mt-2 max-h-[350px] overflow-y-auto bg-white border rounded shadow">
                <EmojiPicker  onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded mt-4"
          >
            Save Changes
          </button>
          <p onClick={()=>setShowPostEdit(false)} className="absolute top-5 right-5 cursor-pointer font-bold">X</p>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
