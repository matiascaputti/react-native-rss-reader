import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import RssItem from '../components/RssItem';

class RssAddInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={() => {}}
          />
        }
      >
        <RssItem />
        <RssItem />
        <RssItem />
        <RssItem />
        <RssItem />
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

export default RssAddInput;
