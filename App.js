import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/components/navigation/AppNavigator';
import LoginProvider from './app/context/LoginProvider';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({});
