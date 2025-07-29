import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import UserPost from './UserPost'

function SearchFeed() {
  const {backendUrl,token}=useContext(AppContext)
  const [posts,setPosts]=useState([])
  const handleAllPost=async ()=>{
    try {
        const response=await axios.get(`${backendUrl}/api/post/fetch-all`,{headers:{token}})
        if(response.data.success){
          
          setPosts(response.data.post)
        }
    } catch (error) {
      console.log("Error")
    }
  }
  useEffect(()=>{
      if(token){
        handleAllPost()
      }
  },[token])
  useEffect(()=>{
    
      console.log(posts)
   
    
  },[posts])
  return (
    <div className='flex flex-col '>
      <div className='w-full flex justify-center gap-2' >
            <input className=' w-[80%] border border-gray-400 m-4 outline-none px-4 py-2 rounded-lg shadow' type="text" placeholder='Search here' />
            <Search className='mt-4 ml-1 w-10 h-10 border-gray-500'/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2'>
         {posts &&
          posts.map((post, index) => (
            <UserPost
              key={index}
              image={post.image}
              postId={post._id}
            />
          ))}
      </div>
    </div>
  )
}

export default SearchFeed
