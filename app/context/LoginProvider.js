import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from 'react';
import userApi from '../api/userApi'

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  const setUserInfo = async () => {
  
    // console.log(profile.image);
    // await AsyncStorage.removeItem('user')
    // await AsyncStorage.removeItem('token')
    // const result = await AsyncStorage.getItem("user");
    // console.log(result);
    const token = await AsyncStorage.getItem("token");

    if(token){
      const result = await userApi.getSingleUser() 
      if(result !== null){
        setProfile(result) 
        setIsLoggedIn(true);
      }else{
        await AsyncStorage.removeItem('token')
        setIsLoggedIn(false);
      }
    }

  
    
  };



  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <LoginContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
      >

        {children}

      </LoginContext.Provider>
  );
}; 

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
