import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EntryItem from '../components/EntryItem';

const FeedList = (props) => {
  const renderArticles = () => props.entries.map((entry, index) => (
    <EntryItem key={index} entry={entry} />
  ));

  return (
    <ScrollView style={styles.container} >
      {renderArticles()}
    </ScrollView>
  );
};

FeedList.propTypes = {
  entries: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  }
});

export default FeedList;
