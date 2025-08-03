import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import UserPost from "../components/UserPost";

function UserProfile() {
  const {
    backendUrl,
    token,
    userId,
    user,
    getUserDetails,
    userDetails,
    fetchUserDetails,
    users,
    fetchAllUser
  } = useContext(AppContext);

  const [userProfile, setUserProfile] = useState(null);
  const [followCheck, setFollowCheck] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("selectedUserId");
    if (userId) {
      fetchUserDetails(userId);
      console.log(userId)
    }
  }, []);
  useEffect(() => {
    if (token) {
      fetchUserDetails(userId);
      getUserDetails();
      fetchAllUser()
    }
  }, [token, userId]);

  useEffect(() => {
    const profile=users.find((user)=>user._id===localStorage.getItem("selectedUserId"))
    console.log(users)
    console.log(userId)
    setUserProfile(profile)
  }, [users]);

  const handleFollowCheck = () => {
    if (user.following.includes(userProfile?._id)) {
      return setFollowCheck(true);
    }
    return setFollowCheck(false);
  };
  const followHandler = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/follow`,
        { targetId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchUserDetails(localStorage.getItem("selectedUserId"));
        fetchAllUser()
        getUserDetails();
        handleFollowCheck();
      }
    } catch (error) {
      console.log("Error");
    }
  };
  const unFollowHandler = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/unfollow`,
        { targetId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchUserDetails(localStorage.getItem("selectedUserId"));
         fetchAllUser()
        getUserDetails();
        handleFollowCheck();
      }
    } catch (error) {
      console.log("Error");
    }
  };
  useEffect(() => {
    if (userProfile) {
      handleFollowCheck();
    }
  }, [userProfile]);

  
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4">
      {userProfile && (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full max-w-4xl">
          {/* Profile Picture */}
          <div className="flex justify-center w-full md:w-auto">
            <img
              className="w-24 h-24 md:w-28 md:h-28 rounded-full"
              src={userProfile.profilePicture}
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col w-full text-center md:text-left">
            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start items-center">
              <p className="text-lg font-bold">{userProfile?.name}</p>
              <div className="flex gap-2">
                <button className="text-white bg-blue-600 px-4 py-1 rounded-lg">
                  {followCheck ? (
                    <p
                      onClick={() => unFollowHandler(userProfile?._id)}
                    >
                      Unfollow
                    </p>
                  ) : (
                    <p onClick={() => followHandler(userProfile?._id)}>
                      Follow
                    </p>
                  )}
                </button>
                <button className="text-white bg-blue-600 px-4 py-1 rounded-lg">
                  Message
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-4 mt-4 text-sm font-semibold">
              <p>Posts {userDetails?.length}</p>
              <p>Followers {userProfile?.followers?.length || 0}</p>
              <p>Following {userProfile?.following?.length || 0}</p>
            </div>

            <div className="mt-3 text-sm">{userProfile.bio}</div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-4xl mt-6">
        {userDetails &&
          userDetails.map((post, index) => (
            <UserPost key={index} image={post.image} postId={post._id} />
          ))}
      </div>
    </div>
  );
}

export default UserProfile;
