import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import {useLogin} from '../../context/LoginProvider';

const UserProfile = () => {
  // const user = AsyncStorage.getItem('user');
  const {profile} = useLogin();

  console.log(profile)

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{profile.email}</Text>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{profile.role}</Text>
      <Text style={styles.username}>{profile.username}</Text>
      <Text style={styles.password}>{profile.password}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserProfile;
