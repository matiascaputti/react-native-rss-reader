import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import EntryDetail from '../components/EntryDetail';

class EntryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <EntryDetail entry={this.props.route.params.entry} />
      </View>
    );
  }
}

EntryScreen.route = {
  navigationBar: {
    visible: true,
    title: 'Article title',
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

export default EntryScreen;
