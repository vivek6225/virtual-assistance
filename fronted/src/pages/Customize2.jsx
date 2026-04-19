import React, {useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'


const Customize2 = () => {
  const {userData}=useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 gap-10'>
      <h1 className='text-white text-[30px] text-center'>Enter your <span className='text-blue-200'>Assistant Name</span></h1>
       <input
            type="text" 
            placeholder='eg.shifra'
            className='w-full max-w-150 h-15 border-2 border-white rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-5 text-[20px] focus:border-blue-400 transition-all' requires onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/> 
            {assistantName &&   <button className='min-w-80 h-15 mt-7 text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]' onClick={()=>navigate("/customize2")}>Finally Create your Assistant</button> }
          
           
    </div>
  )
}
export default Customize2