import apiClient from "./client";

const getAll = async () => {
  // return await apiClient.get("/post").then((res) =>  res.data);
 
  // console.log(response)
  try {
    const response = await apiClient.get("/blog");
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


  // await apiClient.get("/blog").then(function (response) {
  //   console.log(response);
  // }).catch(function (error) {
  //   console.log(error)
  // })







};

const getSingle = async id => {
  try {
    const response = await apiClient.get(`/blog/${id}`); 
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
    const response = await apiClient.get("/blog");
    if (response.data.success) {
      const result = response.data.post.filter(data => data.category === category);
      return result;
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }
};




// const getByCategory = async (category, qty) => {
//   const endpoint = qty ? `/post/${category}/${qty}` : `/posts/${category}`;

//   try {
//     const response = await apiClient.get(endpoint);

//     if (response.data.success) {
//       return response.data.posts;
//     }
//   } catch (error) {
//     console.log('Error while getting categories posts.', error.message);
//     return [];
//   }
// };

const searchPost = async query => {
  if (!query) return {};
  try {
    const response = await apiClient.post(`/blog/search/${query}`);
    // console.log(response);
    return response;
  } catch (error) {
    console.log('Error while searching - searchPost postsAPi', error);
  }
};



export default {
  getAll,
  getByCategory,
  getSingle,
  searchPost,
};







