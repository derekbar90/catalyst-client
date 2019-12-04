import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { connect } from 'react-redux'
import { iRootState, Dispatch, select } from '../stores/store'


type connectedProps = ReturnType<typeof mapState> &
    ReturnType<typeof mapDispatch>
type Props = connectedProps & { navigation: NavigationScreenProp<NavigationState, NavigationParams> }

class LoginScreen extends Component<Props> {
  public static navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>Login Screen {JSON.stringify(this.props.user)}</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.login();
          }}
        />
      </View>
    );
  }
}

const mapState = (state: iRootState) => select(models => ({
  user: models.user.isLoggedIn
}))

const mapDispatch = (dispatch: Dispatch) => ({
  login: dispatch.user.login,
})

export default connect(
  mapState,
  mapDispatch
)(LoginScreen)