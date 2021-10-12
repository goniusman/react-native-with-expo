import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
 
  const setUserInfo = async () => {
    const result = await AsyncStorage.getItem("user");
    if (result !== null) {
      setProfile(JSON.parse(result))
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(true);
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
