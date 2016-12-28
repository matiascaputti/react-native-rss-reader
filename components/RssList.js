import React, { PropTypes } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
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
    />
  ));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={props.isRefreshing}
          onRefresh={() => {}}
        />
      }
    >
      {renderRssItems()}
    </ScrollView>
  );
};

RssList.propTypes = {
  isRefreshing: PropTypes.bool,
  urls: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  }
});

export default RssList;
