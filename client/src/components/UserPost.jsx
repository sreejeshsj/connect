import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Heart, MessageCircle } from "lucide-react";
import assets from "../assets/assets";
import axios from "axios";

function UserPost(props) {
  const { setPostId, setImage, navigate, likeHandler, likedPosts,showPostEdit,setShowPostEdit,postDetails,setPostDetails,backendUrl,token } =
    useContext(AppContext);
  const [visible,setVisible]=useState(false)

  const handleDelete=async (postId)=>{
    try {
      const response=await axios.post(`${backendUrl}/api/post/delete/${postId}`,{},{headers:{token}})
      if(response.data.success){
        console.log(response.data)

      }
    } catch (error) {
      console.log(error.message)
    }
  }
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
        <img onClick={()=>setVisible(true)} className="absolute top-5 right-5 w-8 h-8" src={assets.three_dot} alt="" />
        {visible && 
         <div className="absolute rounded-lg backdrop-blur-sm bg-white flex flex-col gap-2 items-center justify-center w-[80%] h-[50%]">
            <p onClick={()=>{
              setShowPostEdit(true)
              setPostDetails(prev=>({...prev,caption:props.caption,image:props.image,id:props.postId}))
              }} className="text-2xl font-medium text-black-500 shadow w-full text-center">Edit</p>
            <p onClick={()=>handleDelete(props.postId)} className="text-2xl font-medium text-red-500 shadow w-full text-center">Delete</p>
            <p onClick={() => setVisible(false)} className='absolute top-5 right-5 cursor-pointer font-bold'>X</p>
        </div>}
      </div>
    </div>
  );
}

export default UserPost;
