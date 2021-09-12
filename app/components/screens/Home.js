import React, { useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
// import Constants from 'expo-constants';
import usePosts from "../../hooks/usePosts";
import Screen from "../common/Screen";
import SearchBar from "../SearchBar";
import FeaturedPosts from "../FeaturedPosts";
import BreakingPosts from "../BreakingPosts";
import PoliticalPosts from "../PoliticalPosts";
import TechPosts from "../TechPosts";
import EntertainmentPosts from "../EntertainmentPosts";
import ActivityIndicator from "../common/ActivityIndicator";
import { useLogin } from '../../context/LoginProvider';

const Home = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const logOut = () => {
    AsyncStorage.removeItem("user"); 
    AsyncStorage.removeItem("token"); 
    setIsLoggedIn(false);

  }
  const token = AsyncStorage.getItem('token');
  // token.then(result => console.log(result))

  const [isSearchFocused, setSearchFocused] = useState(false);
  const [
    featuredPosts,
    politicalPosts,
    entertainmentPosts,
    techPosts,
    breakingPosts,
    loading,
  ] = usePosts(); 
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ActivityIndicator visible={loading} />
      <Screen isSearchFocused={isSearchFocused}>
      
        <SearchBar setSearchFocused={setSearchFocused} />
        
        <FeaturedPosts item={featuredPosts} />
        <View><Text onPress={() => navigation.navigate('AddPost')} >Create Post</Text></View>
        <View><Text onPress={() => navigation.navigate('UserProfile')} >my Profile</Text></View>
        <View><Text onPress={() => navigation.navigate('ImageUpload')} >my Profile picture</Text></View>
        <View><Text onPress={() => logOut()} >Log Out</Text></View>

        <BreakingPosts data={breakingPosts} /> 
        
        <PoliticalPosts data={politicalPosts} />   
        <TechPosts data={techPosts} />
        <EntertainmentPosts key="home" data={entertainmentPosts} />
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
