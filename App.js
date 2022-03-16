import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import LoginProvider from './app/context/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/components/navigation/AppNavigator';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LoginProvider>
  );


          // return (
          //   <View>

          //      <Test />
          //   </View>
          // )
}

const styles = StyleSheet.create({});
