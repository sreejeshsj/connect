import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import UserPost from "../components/UserPost";

function Profile() {
  const {
    backendUrl,
    token,
    setImage,
    setPostId,
    getUserDetails,
    user,
    getAlFollowingUser,
  } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/post/fetch-user-post`,
        { headers: { token } }
      );
      if (response.data.success) {
        setPosts(response.data.post);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    if (token) {
      getUserDetails();
      getUserPosts();
      getAlFollowingUser();
    }
  }, [token]);
  useEffect(() => {
    console.log(user);
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {user && (
        <div className="flex gap-4">
          <div>
            <img
              className="w-28 h-28 rounded-full m-2"
              src={user.profilePicture}
            />
          </div>
          <div>
            <div className="flex gap-2 justify-start ">
              <p className="m-2 mt-5 font-bold">{user.name}</p>
              <button className="m-2 mt-5 text-white bg-black px-4 py-1 rounded-lg">
                Edit
              </button>
            </div>
            <div className="flex gap-2 justify-end ">
              <p className="m-2 mt-5 font-bold">Posts</p>
              <p className="m-2 mt-5 font-bold">
                Followers {user.followers?.length || 0}
              </p>
              <p className="m-2 mt-5 font-bold">
                Following {user.following?.length || 0}
              </p>
            </div>
            <div className="flex gap-2 justify-start ">
              <p className="m-2 mt-5 text-sm">{user.bio}</p>
            </div>
            <div></div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full m-2">
        {posts &&
          posts.map((post, index) => (
            <UserPost key={index} image={post.image} postId={post._id} />
          ))}
      </div>
    </div>
  );
}

export default Profile;

//https://wallpapers.com/images/hd/xbox-360-profile-pictures-c7gtmke9tkgivobl.jpg
