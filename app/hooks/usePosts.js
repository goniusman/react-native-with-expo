import { useEffect, useState } from "react";
import postsApi from "../api/postsApi";

const usePosts = () => {

  ////// I will use reducer method here
  const [posts, setPosts] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState({});
  const [breakingPosts, setBreakingPosts] = useState([]);
  const [politicalPosts, setPoliticalPosts] = useState([]);
  const [techPosts, setTechPosts] = useState([]);
  const [entertainmentPosts, setEntertainmentPosts] = useState([]);
  const qty = 5;
  const [loading, setLoading] = useState(false);

  const filterFeatured = (data) => {

    return data.filter((item) => item.isPublished === true).reverse()[0];
    // return data.filter((item) => item.isPublished === true).reverse();
  }; 

  const filterByCategory = (data, category) => {
    const result = data
      .filter((item) => item.category === category)
      .reverse()
      .splice(0, qty);  
      
      // const result = data
      // .reverse()
      // .splice(0, qty);

    if (result.length > 3) {
      result.push({ type: "viewMore", category: category, _id: category });
    }

    return result;
  };

  const filterMultiplePosts = async () => {
    setLoading(false);
    const allPosts = await postsApi.getAll();
    // console.log(allPosts);
    if(allPosts && allPosts.length > 0) {
      setFeaturedPosts(filterFeatured(allPosts));
      setPoliticalPosts(filterByCategory(allPosts, "politics"));
      setBreakingPosts(filterByCategory(allPosts, "breaking"));
      setEntertainmentPosts(filterByCategory(allPosts, "entertainment"));
      setTechPosts(filterByCategory(allPosts, "tech"));
      setLoading(false);
    }
    // setPosts(filterPosts(allPosts));   
    // setLoading(true);
  };  
 
  useEffect( async () => {
     await filterMultiplePosts();
      // return () => {
      //   setFeaturedPosts({}); // This worked for me
      //   setEntertainmentPosts({}); // This worked for me
      //   setPoliticalPosts({}); // This worked for me
      //   setTechPosts({}); // This worked for me
      //   setBreakingPosts({}); // This worked for me
      // };
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
