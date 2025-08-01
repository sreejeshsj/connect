import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import {toast} from 'react-toastify'
function Post() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const { backendUrl, token, navigate } = useContext(AppContext);
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("image", image);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/post/create`,
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        navigate('/profile')
        toast.success("Post Uploaded Successfully")
      }
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center">Upload a Post</h2>

        <input
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          name="caption"
          placeholder="Enter caption..."
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          accept="image/*"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Upload Post
        </button>
      </form>
    </div>
  );
}

export default Post;
