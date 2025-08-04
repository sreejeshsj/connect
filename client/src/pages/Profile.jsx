import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import UserPost from "../components/UserPost";
import EditProfilePic from "../components/EditProfilePic";
import EditPost from "../components/EditPost";
import FollowList from "../components/followList";


function Profile() {
  const {
    navigate,
    backendUrl,
    token,
    getUserDetails,
    user,
    getAlFollowingUser,
    setShowProfilePicEdit,
    showProfilePicEdit,
    showPostEdit,setShowPostEdit,
    getAllFollowers,
    followersActive,setFollowersActive,
    followingActive,setFollowingActive,
    followers,
    followingUser,
    getAllFollowing,following
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
  }, [token,showPostEdit,posts]);
 

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {user && (
        <div className="flex gap-4">
          <div>
           {
            user.profilePicture && <img
              className="w-28 h-28 rounded-full m-2 cursor-pointer"
              src={user.profilePicture}
              onClick={()=>setShowProfilePicEdit(true)}
            />
           } 
          </div>
          <div>
            <div className="flex gap-2 justify-start ">
              <p className="m-2 mt-5 font-bold">{user.name}</p>
              <button onClick={()=>navigate('/update')} className="m-2 mt-5 text-white bg-black px-4 py-1 rounded-lg">
                Edit
              </button>
            </div>
            <div className="flex gap-2 justify-end ">
              <p className="m-2 mt-5 font-bold">Posts {posts?.length}</p>
              <p onClick={()=>{
                setFollowersActive(true)
                getAllFollowers(user._id)
                }} className="m-2 mt-5 font-bold cursor-pointer">
                Followers {user.followers?.length || 0}
              </p>
              <p onClick={()=>{
                setFollowingActive(true)
                getAllFollowing(user?._id)
              }} className="m-2 mt-5 font-bold cursor-pointer">
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
            <UserPost key={index} image={post.image} postId={post._id} caption={post.caption} userId={user?._id}/>
          ))}
      </div>
      {showProfilePicEdit && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
          <EditProfilePic image={user.profilePicture} />
        </div>
      )}

      {
      showPostEdit && (
        <div >
          <EditPost />
        </div>
      )
      }

      {
        followersActive && (
          <FollowList  title="Followers" list={followers}  setActive={setFollowersActive}/>
        )
      }
      {
        followingActive && (
          <FollowList  title="Following" list={following} setActive={setFollowingActive} />
        )
      }
    </div>
  );
}

export default Profile;

//https://wallpapers.com/images/hd/xbox-360-profile-pictures-c7gtmke9tkgivobl.jpg
