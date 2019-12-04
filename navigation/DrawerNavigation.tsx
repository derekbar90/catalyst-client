import { createDrawerNavigator } from 'react-navigation-drawer';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import CustomDrawerContentComponent from '../containers/NavigationDrawer';
export default createDrawerNavigator(
  {
    home: {
      screen: MainTabNavigator,
      path: '',
      navigationOptions: {
        drawerLabel: 'Main',
      }
    },
    login: {
      screen: LoginScreen,
      path: 'login',
      navigationOptions: {
        drawerLabel: 'Login w/ Detail Output',
      }
    },
  },
  {
    contentComponent: CustomDrawerContentComponent
  }
);