import apiClient from "./client";

const getAll = async () => {
  // return await apiClient.get("/post").then((res) =>  res.data);
  const response = await apiClient.get("/post");

  try {
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }
};




const getSingle = async id => {
  try {
    const response = await apiClient.get(`/post/${id}`); 
    if (response.data.success) {
      return response.data.data;
    } 
   
  } catch (error) {
    console.log('error while getting single posts', error);
  }
};


const getByCategory = async (category, qty) => {
  const response = await apiClient.get("/post");
  try {
    if (response.data.success) {
      return response.data.data;
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

// const searchPost = async query => {
//   if (!query) return {};
//   try {
//     const response = await apiClient.post(`/post/search/${query}`);
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log('Error while searching - searchPost postsAPi', error);
//   }
// };



export default {
  getAll,
  getByCategory,
  getSingle,
  // searchPost,
};







