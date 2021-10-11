import React, { useState } from "react";
import { Constants } from 'expo';
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { ButtonGroup } from 'react-native-elements';
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
import AppButton from '../common/Button';

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

      

        <BreakingPosts data={breakingPosts} /> 
        
        <PoliticalPosts data={politicalPosts} />   
        <TechPosts data={techPosts} />
        <EntertainmentPosts key="home" data={entertainmentPosts} />

        <View>

   
   
           <AppButton
            onPress= {() => navigation.navigate('UserProfile')}
            title="Profile"
            //  color="#f194ff"
           /> 
            
            <AppButton
              onPress= {() => navigation.navigate('AddPost')}
              title="Create Post"
              //  color="#f194ff"
            />
            
            <AppButton
            onPress= {() => navigation.navigate('ImageUpload')}
            title="Upload Profile Picture"
            //  color="#f194ff"
            /> 
            <AppButton
            onPress= {() => logOut()}
            title="Log Out"
            //  color="#f194ff"
            />
         </View>
      </Screen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  btngroups: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  btn: {
    width: 10,
    
  }
});

export default Home;
