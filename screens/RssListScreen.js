import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RssAddInput from '../components/RssAddInput';
import RssList from '../components/RssList';

const RssListScreen = () => (
  <View style={styles.container}>
    <RssAddInput />

    <RssList />
  </View>
);

RssListScreen.route = {
  navigationBar: {
    visible: true,
    title: 'RSS Reader',
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

export default RssListScreen;
