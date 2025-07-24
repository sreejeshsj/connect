import React from "react";

function UserPost(props) {
  return (
    <div className="bg-white rounded-lg shadow mb-6 w-full max-w-md mx-auto">
      <img className="w-full" src={props.image} alt="" />
      <div className="flex gap-6 justify-start mt-4 mb-3 ml-2  "></div>
    </div>
  );
}

export default UserPost;
