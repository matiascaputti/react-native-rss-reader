import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Coming soon!
          {this.props.route.params.b}
        </Text>
      </View>
    );
  }
}

ProfileScreen.route = {
  navigationBar: {
    visible: true,
    title(params) {
      return params.a;
    },
    backgroundColor: Colors.dark,
    tintColor: '#FFF'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  }
});

export default ProfileScreen;
