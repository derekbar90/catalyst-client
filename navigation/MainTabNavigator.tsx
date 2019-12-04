import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import HomeScreen from "../screens/HomeScreen";
import { Text } from "react-native";
import React from "react";

export default createStackNavigator(
  {
    home: {
      screen: HomeScreen
    },
    login: {
      screen: LoginScreen
    },
    loading: {
      screen: LoadingScreen
    }
  },
  {
    cardStyle: {
      flex: 1
    },
  }
);