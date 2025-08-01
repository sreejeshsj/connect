import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import assets from '../assets/assets'

function EditProfilePic() {
  const { setShowProfilePicEdit, backendUrl, token, navigate, getUserDetails } = useContext(AppContext)
const [image, setImage] = useState(false);

  

  const updateProfilePic = async (e) => {
    e.preventDefault()
    

    const formData = new FormData()
    formData.append('profilePicture', image)
   
    
    try {
      const response = await axios.post(`${backendUrl}/api/user/update-dp`, formData, {
        headers: { token }
      })
      if (response.data.success) {
        
        setShowProfilePicEdit(false)
        getUserDetails()
        navigate('/profile')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={updateProfilePic} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <div className='flex flex-col items-center gap-4 my-10'>
          <p className='text-2xl text-gray-800'>Change Profile Picture</p>
          <label >
            <img
              className='w-24 h-24 object-cover rounded-full hover:opacity-80 cursor-pointer'
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
            />
            <input
              hidden
              type="file"
             
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <button type='submit' className='bg-black px-4 py-2 m-4 w-24 text-white'>Save</button>
        </div>
        <p onClick={() => setShowProfilePicEdit(false)} className='absolute top-5 right-5 cursor-pointer font-bold'>X</p>
      </form>
    </div>
  )
}

export default EditProfilePic
