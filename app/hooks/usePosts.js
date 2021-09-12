import { useState, useEffect } from "react";
import postsApi from "../api/postsApi";

const usePosts = () => {
  // const [posts, setPosts] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState({});
  const [breakingPosts, setBreakingPosts] = useState([]);
  const [politicalPosts, setPoliticalPosts] = useState([]);
  const [techPosts, setTechPosts] = useState([]);
  const [entertainmentPosts, setEntertainmentPosts] = useState([]);
  const qty = 3;
  const [loading, setLoading] = useState(false);

  const filterFeatured = (data) => {
    return data.filter((item) => item.isPublished === true).reverse()[0];
    // return data.filter((item) => item.isPublished === true).reverse();
  }; 

  const filterByCategory = (data, category) => {
    // const result = data
    //   .filter((item) => item.category === category)
    //   .reverse()
    //   .splice(0, qty);  
      
      const result = data
      .reverse()
      .splice(0, qty);

      

    if (result.length) {
      result.push({ type: "viewMore", category: category, _id: category });
    }

    return result;
  };

  const filterMultiplePosts = async () => {
    // setLoading(true);
    const allPosts = await postsApi.getAll();
    // console.log(allPosts);
    // setPosts(filterPosts(allPosts));   
    setFeaturedPosts(filterFeatured(allPosts));
    setPoliticalPosts(filterByCategory(allPosts, "politics"));
    setBreakingPosts(filterByCategory(allPosts, "breaking-posts"));
    setEntertainmentPosts(filterByCategory(allPosts, "entertainment"));
    setTechPosts(filterByCategory(allPosts, "tech"));
    setLoading(false);
  };  
 
  useEffect(() => {
    filterMultiplePosts();
  }, []);

  return [
    // posts,
    featuredPosts,
    politicalPosts,
    entertainmentPosts,
    techPosts,
    breakingPosts,
    loading,
  ];
  // return posts;
};

export default usePosts;
