import React, { Component } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import NavigationService from '../navigation/NavigationService';
import { HomeScreenStyles as style } from './styles/HomeScreenStyle'
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}


class HomeScreen extends Component<Props> {
  public static navigationOptions = {
    title: 'Catalyst Client',
    headerLeft: <TouchableOpacity onPress={() => NavigationService.toggleDrawer()}>
        <View style={{paddingHorizontal: 20}}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </View>
    </TouchableOpacity>
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.mainContainer}>
        <View style={style.welcomeContainer}>
          <Text style={style.welcomeHeader}>Welcome to the Catalyst Client!</Text>
          <Text style={style.welcomeText}>This client pairs perfectly with the Calayst project backend. This universal wallet renders on iOS, Android, and Web with OAuth 2.0 login and user store support out the gate.</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;