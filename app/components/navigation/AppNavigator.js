import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import PostsList from '../lists/PostsList';
import Home from '../screens/Home';
import PostsDetail from '../screens/PostsDetail';

import AppForm from '../AppForm/AppForm';
import AddPost from '../post/addpost';
import ImageUpload from '../AppForm/ImageUpload';
import UserProfile from '../AppForm/UserProfile';
import UpdateForm from '../post/updatePost';
import { useLogin } from '../../context/LoginProvider';

const Stack = createStackNavigator();
 
const LoggedIn = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: 'white',
        headerLeftContainerStyle: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(92,90,91,0.7)',
          alignItems: 'center',
          marginLeft: 10,
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name='Home'
        component={Home}
      />
      <Stack.Screen name='PostsDetail' component={PostsDetail} />
      <Stack.Screen name='PostsList' component={PostsList} />
      <Stack.Screen component={AddPost} name='AddPost' />
      <Stack.Screen component={UserProfile} name='UserProfile' />
      <Stack.Screen component={ImageUpload} name='ImageUpload' />
      <Stack.Screen component={UpdateForm} name='UpdateForm' />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <LoggedIn /> : <StackNavigator />;
  // return <LoggedIn />
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
