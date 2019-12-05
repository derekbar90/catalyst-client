import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles/DrawerFooterStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import dispatch from '../stores/dispatch';

export interface Props {
  isLoggedIn: boolean;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
}

export class DrawerFooter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  private renderSignUp = () => {
    return (
      <TouchableOpacity onPress={() => {
        dispatch().user.login();
      }}>
        <Text>Sign Up/Login In</Text>
      </TouchableOpacity>
    )
  }

  private renderLogout = () => {
    return (
      <TouchableOpacity onPress={() => {
        dispatch().user.logout();
      }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start'}}>
          {
            this.props.isLoggedIn ? this.renderLogout() : this.renderSignUp()
          }
        </View>
      </View>
    );
  }
}

