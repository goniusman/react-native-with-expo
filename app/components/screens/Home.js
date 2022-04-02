import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLogin } from '../../context/LoginProvider';
// import Constants from 'expo-constants';
import usePosts from "../../hooks/usePosts";
import BreakingPosts from "../BreakingPosts";
import ActivityIndicator from "../common/ActivityIndicator";
import AppButton from "../common/Button";
import Screen from "../common/Screen";
import EntertainmentPosts from "../EntertainmentPosts";
import FeaturedPosts from "../FeaturedPosts";
import PoliticalPosts from "../PoliticalPosts";
import SearchBar from "../SearchBar";
import TechPosts from "../TechPosts";


const Home = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [Error, setError] = useState('')
  const logOut = () => {
    AsyncStorage.removeItem("user"); 
    AsyncStorage.removeItem("token"); 
    setIsLoggedIn(false);
  }
  const {profile} = useLogin();
  // const token = AsyncStorage.getItem('token');
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

  return (<>


    <ActivityIndicator visible={loading} />
      <Screen isSearchFocused={isSearchFocused}>

        <SafeAreaView> 

            <SearchBar setSearchFocused={setSearchFocused} />
            
            {
              profile && !profile.verified ? (
                <Text style={styles.sampleStyle}
                  onPress= {() => navigation.navigate('Verification')}
               
                  >Verify your email</Text>
              ) : null
            }
  
              <FeaturedPosts item={featuredPosts} />

              <BreakingPosts data={breakingPosts} /> 
              
              <PoliticalPosts data={politicalPosts} />   
              <TechPosts data={techPosts} />
              <EntertainmentPosts key="home" data={entertainmentPosts} />

              <View>
                {/* <AppButton
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
                  />  */}

                 
                  <AppButton
                  onPress= {() => logOut()}
                  title="Log Out"
                  //  color="#f194ff"
                  />
              </View>
        </SafeAreaView>
        </Screen>

        </>
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
    
  },
  sampleStyle: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    textAlign: "right",
    padding: 15,
    color: 'red'
  }
});

export default Home;
