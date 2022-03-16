import apiClient from "./client";

const getAll = async () => {
  // return await apiClient.get("/post").then((res) =>  res.data);
 
  // console.log(response)
  try {
    const response = await apiClient.get("/category");
    // console.log(response); 
    if (response.data.success) { 

      return response.data.post;
    }else{
      return []
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }


  // await apiClient.get("/category").then(function (response) {
  //   console.log(response);
  // }).catch(function (error) {
  //   console.log(error)
  // })







};

const getSingle = async id => {
  try {
    const response = await apiClient.get(`/category/${id}`); 
    // console.log(response);
    if (response.data.success) {
      return response.data.data;
    }else{
      return {} 
    }
   
  } catch (error) {
    console.log('error while getting single posts', error);
  }
};

const getByCategory = async (category, qty) => {
  
  try {
    const response = await apiClient.get("/category");
    if (response.data.success) {
      const result = response.data.post.filter(data => data.category === category);
      return result;
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }
};

