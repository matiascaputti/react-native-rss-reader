import React, { PropTypes } from 'react';
import { ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RssItem from '../components/RssItem';

const RssList = (props) => {
  const colorsOrder = [
    Colors.yellow,
    Colors.red,
    Colors.purple,
    Colors.blue,
    Colors.dark
  ];

  const renderRssItems = () => props.urls.map((url, index) => (
    <RssItem
      key={index}
      url={url}
      color={colorsOrder[index % colorsOrder.length]}
      handleDelete={props.handleDelete}
    />
  ));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={props.isRefreshing}
          onRefresh={props.handleRefresh}
        />
      }
    >
      { props.urls.length ?
        renderRssItems() :
        <Text style={styles.error}>No RSS saved yet, add a new one 👆</Text>
      }
    </ScrollView>
  );
};

RssList.propTypes = {
  isRefreshing: PropTypes.bool,
  urls: PropTypes.array,
  handleRefresh: PropTypes.func,
  handleDelete: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  },

  error: {
    color: '#777',
    textAlign: 'center',
    marginTop: 15
  }
});

export default RssList;
