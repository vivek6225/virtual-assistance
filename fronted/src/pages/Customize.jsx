import { MdKeyboardBackspace } from "react-icons/md";
import React, { useState, useRef } from 'react'
import { BiImageAdd } from "react-icons/bi";
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


function Customize  ()  {
 const {  serverUrl,  userData,  setUserData, handleCurrentUser,  backendImage , setBackendImage, frontendImage ,  setFrontendImage,  selectedImage, setSelectedImage}=useContext(userDataContext)
 const navigate=useNavigate()
  const inputImage=useRef()

  const handleImage=(e)=>{
    const file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 gap-10'>
      <MdKeyboardBackspace className="absolute top-8 left-8 text-white cursor-pointer w-5 h-5" onClick={()=>navigate("/")}/>
   
      <h1 className='text-white text-[30px] text-center'>Select Your <span className='text-blue-200'>Assistant Image</span></h1>

      <div className='w-full max-w-225 flex justify-center items-center flex-wrap gap-4'>
      <Card image={image1}/>
      <Card image={image2}/>
      <Card image={image3}/>
      <Card image={image4}/>
      <Card image={image5}/>
      <Card image={image6}/>
      <Card image={image7}/>
     

          <div className={`w-20 h-30 lg:w-40 lg:h-65 bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white  flex items-center justify-center ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null }`} onClick={()=>{
            inputImage.current.click()
            setSelectedImage("input")

          }}>

            {!frontendImage && <BiImageAdd className='text-white w-10 h-10' /> }
            {frontendImage && <img src={frontendImage}className='h-full object-cover'/>}
          
    

    </div>
   <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
      </div>
        {selectedImage &&  <button className='px-6 py-2 text-black font-semibold bg-white rounded-full text-[16px] shadow-md' onClick={()=>navigate("/customize2")}>Next</button> }
      
     
    </div>
    
  )
}

export default Customize
