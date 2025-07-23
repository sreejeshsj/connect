import React from 'react'
import PostCard from '../components/PostCard'

function Profile() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4'>
      <div className='flex gap-4'>
         <div >
            <img className='w-28 h-28 rounded-full m-2' src="https://wallpapers.com/images/hd/xbox-360-profile-pictures-c7gtmke9tkgivobl.jpg" alt="" />
         </div>
         <div>
            <div className='flex gap-2 justify-start '>
                <p className='m-2 mt-5 font-bold'>User1</p>
                <button  className='m-2 mt-5 text-white bg-black px-4 py-1 rounded-lg'>Edit</button>
                </div>
            <div className='flex gap-2 justify-end '>
                <p className='m-2 mt-5 font-bold'>Posts</p>
                <p className='m-2 mt-5 font-bold'>Followers</p>
                <p className='m-2 mt-5 font-bold'>Following</p>
                </div>
            <div className='flex gap-2 justify-start '>
                <p className='m-2 mt-5 text-sm'>Fail and Master the Development</p>
                </div>
            <div></div>
         </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full m-2'>
  <PostCard/>
   <PostCard/>
    <PostCard/> <PostCard/> <PostCard/> <PostCard/>
   <PostCard/>
    <PostCard/>
</div>

    </div>
  )
}

export default Profile
