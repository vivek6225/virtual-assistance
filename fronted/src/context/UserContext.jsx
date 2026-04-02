import axios from 'axios'
import React, { createContext,useEffect, useState } from 'react'


export const userDataContext = createContext()

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:5000"

  const [userData, setUserData]=useState(null)

  const handleCurrentUser=async ()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
      setUserData(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
  const tokenExists = document.cookie.includes("token");
  
  if(tokenExists){
    handleCurrentUser();
  }
},[])

  const value = {
  serverUrl,
  userData,
  setUserData,
  handleCurrentUser
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext