import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import FeedList from '../components/FeedList';

const FeedScreen = props => (
  <View style={styles.container}>
    <FeedList entries={props.route.params.entries} />
  </View>
);

FeedScreen.route = {
  navigationBar: {
    visible: true,
    title(params) {
      return params.title;
    },
    backgroundColor: Colors.dark,
    tintColor: '#FFF'
  }
};

FeedScreen.propTypes = {
  route: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  }
});

export default FeedScreen;
