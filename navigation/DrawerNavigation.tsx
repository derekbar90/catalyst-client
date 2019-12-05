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
    }
  },
  {
    contentComponent: CustomDrawerContentComponent
  }
);