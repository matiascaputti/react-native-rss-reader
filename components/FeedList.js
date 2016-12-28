import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import EntryItem from '../components/EntryItem';

class FeedList extends React.Component {
  constructor(props) {
    super(props);

    this.renderArticles = this.renderArticles.bind(this);
  }

  renderArticles() {
    return this.props.entries.map((entry, index) => (
      <EntryItem key={index} entry={entry} />
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container} >
        {this.renderArticles()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  }
});

export default FeedList;
