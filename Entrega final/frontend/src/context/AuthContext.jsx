import React, { createContext, useContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../utils/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth must be use within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signup = async (user) => {
    try{
      const res = await registerRequest(user)
      return res
    }catch(error){
      throw Error(error)
    }
  }

  const login = async (user) => {
    try{
      const res = await loginRequest(user)
      setUser(res.data.payload.userDB)
      setIsAuthenticated(true)
    }catch(error){
      throw Error(error)
    }
  }

  const logout = async () => {
    try{
      const res = await logoutRequest()
      Cookies.remove("jwtCookieToken");
      setUser(null);
      setIsAuthenticated(false);
    }catch(error){
      throw Error(error)
    }
  };

  useEffect(() => {
    const cookies = Cookies.get()

    if(cookies.jwtCookieToken){
      try{
        const res = verifyTokenRequest()
        .then(result => {
          setUser(result.data.payload)
          setIsAuthenticated(true)
        })
      }catch(error){
        console.log(error)
        setIsAuthenticated(false)
        setUser(null)
      }
    }

  }, [])

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        isAuthenticated,
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
}