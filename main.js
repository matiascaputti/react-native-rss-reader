import Exponent from 'exponent';
import React from 'react';
import { Platform, StatusBar, View, StyleSheet } from 'react-native';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Router from './navigation/Router';
import Colors from './constants/Colors';

const AppContainer = () => {
  const initialRoute = Router.getRoute('rssList');

  return (
    <View style={styles.container}>
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={initialRoute} />
      </NavigationProvider>

      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});

Exponent.registerRootComponent(AppContainer);
