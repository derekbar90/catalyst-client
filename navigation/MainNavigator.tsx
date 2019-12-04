import { createSwitchNavigator } from 'react-navigation';
import DrawerNavigation from './DrawerNavigation';

export default createSwitchNavigator(
  {
    Drawer: {
      screen: DrawerNavigation,
      path: ''
    },
  },
  {
    //@ts-ignore
    history: 'hash'
  }
)