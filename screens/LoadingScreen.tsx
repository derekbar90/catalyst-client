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

class LoadingScreen extends Component<Props> {
  public static navigationOptions = {
    title: 'Loading Screen',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>Loading Screen</Text>
        <Button
          title="Loading"
          onPress={() => {
            navigation.navigate('home');
          }}
        />
      </View>
    );
  }
}

export default LoadingScreen;