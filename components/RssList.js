import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RssItem from '../components/RssItem';

class RssAddInput extends React.Component {
  constructor(props) {
    super(props);

    this.colorsOrder = [
      Colors.yellow,
      Colors.red,
      Colors.purple,
      Colors.blue,
      Colors.dark
    ];

    this.state = {
      loading: false,
      urls: this.props.urls
    };
  }

  renderRssItems() {
    return this.props.urls.map((url, index) => (
      <RssItem
        key={index}
        url={url}
        color={this.colorsOrder[index % this.colorsOrder.length]}
      />
    ));
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
        {this.renderRssItems()}
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
