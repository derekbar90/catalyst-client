import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux'
import Gate, { store } from './stores/store';
import NavigationService from './navigation/NavigationService';

export default function App() {
  return (
    <View style={styles.container}>
      <Gate>
        <Provider store={store}>
          <AppNavigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </Gate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
