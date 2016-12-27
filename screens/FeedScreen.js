import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Coming soon!</Text>
  </View>
);

ProfileScreen.route = {
  navigationBar: {
    visible: true,
    title: 'Feed screen title',
    backgroundColor: Colors.dark,
    tintColor: '#FFF'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 30
  }
});

export default ProfileScreen;
