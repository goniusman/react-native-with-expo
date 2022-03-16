import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
// import * as permissions from 'expo-permissions';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useLogin} from '../../context/LoginProvider'
import client from '../../api/client'; 
   
const ImageUpload = props => {
  const [profileImage, setProfileImage] = useState('');
  const [progress, setProgress] = useState(0);
  // const { token } = props.route.params;



  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };


 

  const uploadProfileImage = async () => {

  
   
    // console.log(token) 

    const formData = new FormData();
    // console.log(profileImage);
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImage,
      type: 'image/jpg',
    });

    const token = await AsyncStorage.getItem('token');
   console.log(token);
    function stripquotes(a) {
      if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
          return a.substr(1, a.length-2);
      }
      return a;
    }

    try {
      const res = await client.put('/user/profile-picture', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${stripquotes(token)}`,
        },
      });
      // console.log(res.data)
      if (res.data.success) {

        // setProfile(res.data.user);
        // setIsLoggedIn(true);
        // await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        // await AsyncStorage.setItem("token", JSON.stringify(res.data.token));

        props.navigation.dispatch(StackActions.replace('UserProfile'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload Profile Image</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.skip}>Skip</Text>
        {profileImage ? (
          <Text
            onPress={uploadProfileImage}
            style={[
              styles.uploadBtn, 
              { backgroundColor: 'green', color: 'white', borderRadius: 8 },
            ]}
          >
            Upload
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ImageUpload;
