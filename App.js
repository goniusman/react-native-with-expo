import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import { StyleSheet } from "react-native";
import 'react-native-gesture-handler';
import AppNavigator from './app/components/navigation/AppNavigator';
import LoginProvider from './app/context/LoginProvider';


export default function App() {
  return (
   
    <LoginProvider>
      
        <AppNavigator />
      
    </LoginProvider>

  );

}

const styles = StyleSheet.create({});
