import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import EntryDetail from '../components/EntryDetail';

const EntryScreen = props => (
  <View style={styles.container}>
    <EntryDetail entry={props.route.params.entry} />
  </View>
);

EntryScreen.route = {
  navigationBar: {
    visible: true,
    title(params) {
      return params.entry.title;
    },
    backgroundColor: Colors.dark,
    tintColor: '#FFF'
  }
};

EntryScreen.propTypes = {
  route: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  }
});

export default EntryScreen;
