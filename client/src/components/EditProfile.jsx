import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from "../context/AppContext";
import axios from 'axios';
function EditProfile() {
  const {token,backendUrl,navigate}=useContext(AppContext)
  const [name,setName]=useState('')
  const [bio,setBio]=useState('')
  const updateProfile=async (e)=>{
    e.preventDefault()
    try {
      const response=await axios.post(`${backendUrl}/api/user/update`,{name,bio},{headers:{token}})
      if (response.data.success){
        navigate('/profile')
      }
    } catch (error) {
      console.log("Error",error.message)
    }
  }
  return (
    <div className='flex flex-col h-[80%] justify-center items-center'>
      <form onSubmit={updateProfile}  className='flex flex-col justify-center items-center w-[400px] h-[400px] gap-5 shadow rounded-lg p-10'>
        <h1 className='font-bold text-2xl text-gray-600'>Update</h1>
        <input onChange={(e)=>setName(e.target.value)} className='border border-gray-300 p-2  rounded-lg outline-none w-full shadow' type="text" placeholder='Username' required />
        <input onChange={(e)=>setBio(e.target.value)} className='border border-gray-300 p-2 rounded-lg outline-none w-full shadow' type="text" placeholder='Bio' required />
        <button type='submit'  className='bg-black text-white px-4 py-2 w-[100px]'>Save</button>
      </form>
    </div>
  )
}

export default EditProfile
