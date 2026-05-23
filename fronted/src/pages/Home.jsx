import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
   const {userData,serverUrl,setUserData}= useContext(userDataContext)
   const navigate=useNavigate()

const handlelogOut=async()=>{
  try {
    const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
    setUserData(null)
    navigate("/signin")
  } catch (error) {
    setUserData(null)
    console.log(error)
  }
}
    

  return (
    <div className='w-full h-screen bg-linear-to-t from-black to-[#02023d] flex justify-center items-center flex-col gap-4'>
       <button className='min-w-38 h-15 mt-8 text-black font-semibold absolute top-5  right-5 bg-white rounded-full cursor-pointer text-[19px] '
        onClick={handlelogOut}>Log Out</button>
          <button className='min-w-38 h-15 mt-8 text-black font-semibold absolute top-25 right-5 bg-white rounded-full cursor-pointer text-[19px] px-5 py-5'
        onClick={()=>navigate("/customize")}>Customize your Assistant</button>
<div className='w-75 h-100 flex justify-center items-center overflow-hidden rounded-4xl shadow-lg '>
  <img src={userData?.assistantImage} alt="" className='w-full h-full object-cover'/>

</div>
<h1 className='text-white text-[20px] font-semibold'>I'm  {userData?.assistantName}</h1>
    </div>
  )
}

export default Home