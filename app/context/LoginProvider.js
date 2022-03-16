import React, { createContext, useContext, useState, useEffect, ScrollView } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
 
  const setUserInfo = async () => {
    // await AsyncStorage.removeItem('user')
    // await AsyncStorage.removeItem('token')
    const result = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");
    // console.log(result); 
    if (result != null) {
      setProfile(JSON.parse(result))
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    };
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
