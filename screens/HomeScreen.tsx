import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class HomeScreen extends Component<Props> {
  public static navigationOptions = {
    title: 'Home Screen',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;