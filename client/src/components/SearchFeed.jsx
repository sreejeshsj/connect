import axios from "axios";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import UserPost from "./UserPost";

function SearchFeed() {
  const {
    backendUrl,
    token,
    setUserId,
    navigate,
    fetchUserDetails,
    loggedInUser,
  } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);
  const [searchActive, setSerachActive] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleAllPost = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/post/fetch-all`, {
        headers: { token },
      });
      if (response.data.success) {
        setPosts(response.data.post);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const searchHandler = () => {
    if(search.trim()){
      const filtered = posts.filter((post) =>
      post.userId.name.toLowerCase().includes(search.toLowerCase())
    );
    const uniqueFiltered = Array.from(
      new Map(filtered.map((post) => [post.userId._id, post])).values()
    );
    
    setFilteredPost(uniqueFiltered);
    setSearch("")
    }
    
  };
  useEffect(() => {
    if (token) {
      handleAllPost();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full flex justify-center gap-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className=" w-[80%] border border-gray-400 m-4 outline-none px-4 py-2 rounded-lg shadow"
          type="text"
          placeholder="Search here"
        />
        {searchActive ? (
          <p
            onClick={() => {
              setFilteredPost([])
              setSerachActive(false)
            }}
            className="text-2xl mt-4 ml-1 w-10 h-10 border border-gray-500 rounded-full text-center cursor-pointer leading-[2.5rem]"
          >
            X
          </p>
        ) : (
          <Search
            onClick={() => {
              searchHandler();
              setSerachActive(true);
            }}
            className="mt-4 ml-1 w-10 h-10 border-gray-500 cursor-pointer"
          />
        )}
      </div>
      {searchActive && filteredPost.length>0
        ? filteredPost.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                if (data.userId._id === loggedInUser) {
                  navigate("/profile");
                } else {
                  localStorage.setItem("selectedUserId", data.userId._id);
                  navigate("/user-profile");
                }
              }}
              className="flex h-28 items-center justify-center shadow border rounded-lg w-[50%] gap-2"
            >
              <img
                className="w-14 h-14 border rounded-full"
                src={data.userId.profilePicture}
                alt=""
              />
              <p className="font-bold text-gray-500 text-1.5xl">
                {data.userId.name}
              </p>
            </div>
          ))
        : searchActive && filteredPost.length===0 ? <p>No User Found</p> : ''}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
        {posts &&
          posts.map((post, index) => (
            <UserPost key={index} image={post.image} postId={post._id} />
          ))}
      </div>
    </div>
  );
}

export default SearchFeed;
