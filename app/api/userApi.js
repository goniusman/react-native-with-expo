import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./client";  


function stripquotes(a) {
  if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
      return a.substr(1, a.length-2);
  }
  return a;
}


const registerUser = async (user) => {
  const res = await apiClient.post("/user/register", user);
  // console.log(res);
  if (res.data.success) {
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    return true
  }else{
    let message = res.data.message;
    return message;
  }

}

const loginUser = async (user) => {
  const res = await apiClient.post("/user/login", user);
  if (res.data.success) {
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
    return true;
  }else{
    let message = res.data.message;
    return message;
  }
}


const getSingleUser = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await apiClient.get('/user/single', {
    headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${stripquotes(token)}`,
    }
  });
  // console.log(res.data);

  if(res.data.success){
    let user = res.data.user
    return user
  }else{
    return null;
  }
 
}

const profilePictureUpdate = async (formData) => {
  const token = await AsyncStorage.getItem("token");
  const res = await apiClient.put('/user/profile-picture', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'authorization': `Bearer ${stripquotes(token)}`,
    },
  });
  if (res.data.success) {
    return true;
  }else{
    return false
  }
}



export default {
  registerUser,
  loginUser,
  getSingleUser,
  profilePictureUpdate
};
