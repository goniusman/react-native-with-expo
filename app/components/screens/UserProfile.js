import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useNavigation } from '@react-navigation/native';

import {useLogin} from '../../context/LoginProvider';
import AppButton from '../common/Button';

const UserProfile = () => {
  const navigation = useNavigation();
  // const user = AsyncStorage.getItem('user');
  const {profile} = useLogin();

  // console.log(profile)

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{profile.email}</Text>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{profile.role}</Text>
      <Text style={styles.username}>{profile.username}</Text>
      <Text style={styles.password}>{profile.password}</Text>
 
      {profile.image ? (
        <View >
            <Image style={{ width: 200, height: 200 }} source={{uri:profile.image}} />
        </View>
      ): (
        <AppButton
            onPress= {() => navigation.navigate('ImageUpload')}
            title="Upload Profile Picture"
            //  color="#f194ff"
            /> 
      )}
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 50,
  },
  image: {
    width: 200,
    height: 200
  }
});

export default UserProfile;
