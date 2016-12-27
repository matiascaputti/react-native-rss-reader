import Exponent from 'exponent';
import React, { PropTypes } from 'react';
import { Platform, StatusBar, StyleSheet,
         View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Router from './navigation/Router';
import Colors from './constants/Colors';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { appIsReady: false };
  }

  render() {
    const initialRoute = Router.getRoute('rssList');

    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <StackNavigation
            id="root"
            initialRoute={initialRoute}
          />
        </NavigationProvider>

        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      </View>
    );
  }
}

AppContainer.propTypes = {
  exp: PropTypes.object
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
