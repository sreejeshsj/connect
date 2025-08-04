import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'


function FollowList({title,list,setActive}) {
    
    


  return (
    <div className='absolute right-0 left-0 bottom-0 top-0 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
        
      <div className='w-[400px] h-[400px] bg-white flex flex-col relative'>
  <h3 className='shadow w-full text-center h-[30px]'>{title}</h3>
  
  <div className='h-[50px] w-full flex justify-center items-center'>
    <input
      className='border shadow border-gray-400 outline-none rounded-lg w-[80%] h-[40px] text-center'
      type="text"
      placeholder='search'
    />
  </div>

  <div className='flex flex-col items-center gap-4 mx-5 mt-2 mb-5 overflow-y-auto scroll-smooth h-[270px]'>
    {list.length > 0 ? list.map((user, index) => (
      <div key={index} className='flex gap-2 shadow p-2 w-full rounded'>
        <img className='w-6 h-6 rounded-full' src={user.profilePicture} alt="" />
        <p className='font-bold'>{user.name}</p>
      </div>
    )) : <p>No followers</p>}
  </div>

  <p onClick={()=>setActive(false)} className='absolute top-1 right-3 text-black cursor-pointer font-bold'>X</p>
</div>

    </div>
  )
}

export default FollowList
