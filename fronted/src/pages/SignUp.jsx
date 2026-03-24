import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {serverUrl} = useContext(userDataContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)   

  const handleSignUp = async (e)=>{
    e.preventDefault()
    setErr("")
    setLoading(true)

    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`,{
        name, email, password
      },{withCredentials:true})

      if (result.data) {
        navigate("/signin")
      }

      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response?.data?.message || error.message) 
    }
  }

  return (
    <div 
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}>

      <form className='w-full h-150 max-w-125 bg-black/70 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-5 px-10 rounded-2xl' onSubmit={handleSignUp}>

        <h1 className='text-white text-3xl font-semibold mb-10 text-center'>
          Register to 
          <span className='text-blue-400'> Virtual Assistance</span>
        </h1>

        <input 
          type="text" 
          placeholder='Enter your Name' 
          className='w-full h-14 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg focus:border-blue-400 transition-all' 
          required 
          onChange={(e)=>setName(e.target.value)} 
          value={name}
        /> 

        <input 
          type="email" 
          placeholder='Email' 
          className='w-full h-14 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg focus:border-blue-400 transition-all' 
          required 
          onChange={(e)=>setEmail(e.target.value)} 
          value={email}
        />  
          
        <div className='w-full h-14 relative'>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder='Password' 
            className='w-full h-full border-2 border-white rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-5 text-lg focus:border-blue-400 transition-all'
            required 
            onChange={(e)=>setPassword(e.target.value)} 
            value={password} 
          />
           
          {!showPassword ? (
            <IoEye 
              className='absolute top-4.5 right-5 w-7 h-7 text-white cursor-pointer' 
              onClick={() => setShowPassword(true)}  
            />
          ) : (
            <IoEyeOff 
              className='absolute top-4.5 right-5 w-7 h-7 text-white cursor-pointer' 
              onClick={() => setShowPassword(false)}  
            />
          )}
        </div> 

        {err.length > 0 && (
          <p className='text-red-500 text-[20px]'>
            *{err}
          </p>
        )}
  
        <button 
          type="submit" 
          disabled={loading}
          className='min-w-38 h-15 mt-8 text-black font-semibold bg-white rounded-full text-[19px]'
        >
          {loading ? "Loading..." : "Sign Up"}  
        </button>

        <p 
          className='text-white text-[18px] cursor-pointer'
          onClick={()=>navigate("/signin")}
        >
          Already have an account ? 
          <span className="text-blue-400"> Sign In</span>
        </p>
        
      </form> 
    </div>
  )
}

export default SignUp