import { MdKeyboardBackspace } from "react-icons/md";
import React, {useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Customize2 = () => {
  const {userData, backendImage, frontendImage, serverUrl,setUserData, selectedImage}=useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleUploadAssistant=async ()=>{
    setLoading(true)
   try {
    
    let formData=new FormData()
      formData.append("assistantName", assistantName)
      if(backendImage){
        formData.append("assistantImage", backendImage)
      }else{
        formData.append("imageUrl", selectedImage)
      }
         
      const result=await axios.post(`${serverUrl}/api/user/update`, formData,{withCredentials:true})
      setLoading(false)
      console.log(result.data)
    setUserData(result.data)
    navigate("/")
   } catch (error) {
    setLoading(false)
    console.log(error)
     
   }
  }

  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 gap-10 relative'>
      <MdKeyboardBackspace className="absolute top-8 left-8 text-white cursor-pointer w-5 h-5" onClick={()=>navigate("/customize")}/>
      <h1 className='text-white text-[30px] text-center'>Enter your <span className='text-blue-200'>Assistant Name</span></h1>
       <input
            type="text" 
            placeholder='eg.shifra'
            className='w-full max-w-150 h-15 border-2 border-white rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-5 text-[20px] focus:border-blue-400 transition-all' required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/> 
            {assistantName &&   <button className='min-w-80 h-15 mt-7 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px] ' disabled={loading} onClick={()=>{
              
              handleUploadAssistant()
              }
              }>{! loading ? "Finally Create your Assistant" : "Loading..."}</button> }
          
           
    </div>
  )
}
export default Customize2