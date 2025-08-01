import React, { useEffect, useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
function EditPost() {
  const {setShowPostEdit, navigate, postDetails,backendUrl,token } = useContext(AppContext);
  const [newCaption, setNewCaption] = useState("");
  const [image, setImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append('caption',newCaption)
    if(image){
        formData.append('image',image)
    }
    try {
        const response = await axios.post(`${backendUrl}/api/post/update/${postDetails.id}`,formData,{headers:{token}})
        if(response.data.success){
           setShowPostEdit(false)
        }
    } catch (error) {
        console.log(error.message)
    }
  };
  const handleEmojiClick = (emojiData) => {
    setNewCaption((prev) => prev + emojiData.emoji);
  };
  useEffect(() => {
    setNewCaption(postDetails.caption);
    
  }, [postDetails.caption]);
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-12 rounded-xl text-slate-500 flex "
      >
        <div>
            <label htmlFor="imageInput">
                 <img
            className="w-[400px] h-[400px]"
            src={image ? URL.createObjectURL(image) : postDetails.image}
            alt=""
          />
          <input onChange={(e)=>setImage(e.target.files[0])} hidden type="file" name="" id="imageInput"/>
            </label>
         
          
        </div>
        <div className="flex flex-col justify-start items-center">
          <div>
            <input
              onChange={(e) => setNewCaption(e.target.value)}
              value={newCaption}
              type="text"
              className="border border-none outline-none p-10"
              placeholder="Write here"
            />
            <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😊
            </button>
            {showEmojiPicker && (
              <div>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <button type="submit" className="bg-black text-white px-4 py-2">
            Save Chnages
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
