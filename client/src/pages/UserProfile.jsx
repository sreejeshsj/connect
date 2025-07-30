import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import UserPost from "../components/UserPost";

function UserProfile() {
  const {  token, userId, user, getUserDetails ,userDetails,fetchUserDetails} = useContext(AppContext);
  
  const [userProfile, setUserProfile] = useState(null);
  const [followCheck, setFollowCheck] = useState(false);

   
  useEffect(() => {
    if (token) {
      fetchUserDetails();
      getUserDetails();
    }
  }, [token, userId]);

  useEffect(() => {
    if (userDetails.length > 0) {
      setUserProfile(userDetails[0]);
    }
  }, [userDetails]);

  const handleFollowCheck = () => {
    if (user.following.includes(userProfile?.userId?._id)) {
      setFollowCheck(true);
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
              src={userProfile.userId.profilePicture}
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col w-full text-center md:text-left">
            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start items-center">
              <p className="text-lg font-bold">{userProfile?.userId?.name}</p>
              <div className="flex gap-2">
                <button className="text-white bg-blue-600 px-4 py-1 rounded-lg">
                  {followCheck ? 'Unfollow' : 'Follow'}
                </button>
                <button className="text-white bg-blue-600 px-4 py-1 rounded-lg">Message</button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-4 mt-4 text-sm font-semibold">
              <p>Posts</p>
              <p>Followers</p>
              <p>Following</p>
            </div>

            <div className="mt-3 text-sm">{userProfile.userId.bio}</div>
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
