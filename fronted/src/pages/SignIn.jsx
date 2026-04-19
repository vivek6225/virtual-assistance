import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

function SignIn()  {
  const [showPassword, setShowPassword] = useState(false)
    const { serverUrl, userData, setUserData } = useContext(userDataContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)   

  const handleSignIn = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password
      }, { withCredentials: true })
        setUserData(result.data)
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log("ERROR:", error)
      setUserData(null)
      setErr(error.response?.data?.message || "Server Error")
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <form
        className='w-full h-150 max-w-125 bg-black/70 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center gap-5 px-10 rounded-2xl'
        onSubmit={handleSignIn}
      >

        <h1 className='text-white text-3xl font-semibold mb-10 text-center'>
          Sign In to
          <span className='text-blue-400'> Virtual Assistance</span>
        </h1>

        <input
          type="email"
          placeholder='Email'
          autoComplete="username"
          className='w-full h-14 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-lg focus:border-blue-400 transition-all'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className='w-full h-14 relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            autoComplete="current-password"
            className='w-full h-full border-2 border-white rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-5 text-lg focus:border-blue-400 transition-all'
            required
            onChange={(e) => setPassword(e.target.value)}
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

        {err && (
          <p className='text-red-500 text-[16px]'>
            *{err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className='min-w-38 h-15 mt-8 text-black font-semibold bg-white rounded-full text-[19px]'
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className='text-white text-[18px] cursor-pointer'
          onClick={() => navigate("/signup")}
        >
          want to create a new account ?
          <span className="text-blue-400"> Sign Up</span>
        </p>

      </form>
    </div>
  )
}

export default SignIn