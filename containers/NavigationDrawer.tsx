import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { connect } from 'react-redux'
import { iRootState, Dispatch, select } from '../stores/store'
import { DrawerHeader } from '../components/DrawerHeader';
import { DrawerFooter } from '../components/DrawerFooter';

const CustomDrawerContentComponent = props => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        {props.isLoggedIn && <DrawerHeader name={props.firstName}/>}
        <DrawerItems {...props} />
        <View style={[styles.container, styles.footerContainer]}>
          <DrawerFooter isLoggedIn={props.isLoggedIn} navigation={props.navigation}/>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

const mapState = (state: iRootState) => select(models => ({
  firstName: models.user.firstName,
  isLoggedIn: models.user.isLoggedIn
}))

const mapDispatch = (dispatch: Dispatch) => ({
  login: dispatch.user.login,
})

export default connect(
  mapState,
  mapDispatch
)(CustomDrawerContentComponent)