import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./client";


function stripquotes(a) {
  if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
      return a.substr(1, a.length-2);
  }
  return a;
}

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
  const endpoint = qty ? `/blog/${category}/${qty}` : `/blog/${category}`;

  try {
    const response = await apiClient.get(endpoint);
// console.log(response);
    if (response.data.success) {
      return response.data.post;
    }
  } catch (error) {
    console.log('Error while getting categories posts.', error.message);
    return [];
  }
};

const getByCategoryTest = async (category, qty) => {
  // return await apiClient.get("/post").then((res) =>  res.data);
 
  // console.log(response)
  try {
    const response = await apiClient.get("/blog");
    // console.log(response.data); 
    if (response.data.success) { 
      const data = response.data.post.filter( (item) => item.category !== category );
      return data;
    }else{
      return []
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }

 
};

const searchPost = async query => {
  if (!query) return {};
  try {
    const response = await apiClient.post(`/blog/search/${query}`);
      return response.data;
  
  } catch (error) {
    console.log('Error while searching - searchPost postsAPi', error);
  }
};

const updatePost = async (post, id) => {
  const res = await apiClient.put(`/blog/${id}`, post);
// console.log(res);
  if (res.data.success) {
    return true;
  }else{
    return false;
  }
}

const addPost = async (post) => {
  const token = await AsyncStorage.getItem("token");
      // const { title, description, category, tag, author } = post;
      const res = await apiClient.post("/blog", post, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${stripquotes(token)}`,
          }
        }
      );

      if(res.data.success){
        return true;
      }else{
        return false;
      }
}


const addComment = async (comment) => {
  // console.log(comment);
  const token = await AsyncStorage.getItem("token");
  const res = await apiClient.post("/comment", comment, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${stripquotes(token)}`,
      }
    }
  );
// console.log(res);
  if(res.data.success){
    return true;
  }else{
    return false;
  }
}

const getAllComments = async (id) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await apiClient.get(`/comment/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${stripquotes(token)}`,
      }
    });
    // console.log(response.data); 
    if (response.data.success) { 

      return response.data.comments;
    }else{
      return []
    }
  } catch (error) {
    console.log("Error while getting all posts.", error.message);
    return [];
  }
}


export default {
  getAll,
  getByCategory,
  getByCategoryTest,
  getSingle,
  searchPost,
  updatePost,
  addPost,
  addComment,
  getAllComments
};







