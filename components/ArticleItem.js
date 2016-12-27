import React from 'react';
import { View, Text, TouchableOpacity,
         StyleSheet } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import Image from 'react-native-image-progress';

@withNavigation
class RssItem extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: ''
    };

    this.goToFeed = this.goToFeed.bind(this);
  }

  componentDidMount() {
    const parseUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=';
    const rssUrl = 'https://www.reddit.com/r/news/.rss';

    fetch(parseUrl + rssUrl)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        title: json.responseData.feed.title,
        description: json.responseData.feed.description
      });
      // console.log(json.responseData.feed.title);
      // console.log(json.responseData.feed.description);
    });
  }

  goToFeed() {
    this.props.navigator.push('feed', { a: 1, b: 2 });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.goToFeed}>
        <View style={styles.rssContainer}>
          <View style={styles.rssContainerLeft}>
            <Text
              style={styles.title}
              numberOfLines={2}
            >
              {this.state.title}
            </Text>
            <Text
              style={styles.body}
              numberOfLines={3}
            >
              {this.state.description}
            </Text>
            <Text style={styles.added}>30 minutes ago</Text>
          </View>

          <View style={styles.rssContainerRight}>
            <Image
              style={styles.image}
              source={{ uri: 'http://placeimg.com/401/401/any' }}
              resizeMode={'stretch'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rssContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    marginBottom: 5
  },

  rssContainerLeft: {
    flex: 2,
    padding: 7
  },

  rssContainerRight: {
    flex: 1
  },

  title: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600'
  },

  body: {
    color: '#777',
    fontSize: 12,
    paddingTop: 7
  },

  added: {
    color: '#AAA',
    fontSize: 9,
    fontWeight: '500',
    paddingTop: 7
  },

  image: {
    flex: 1
  }
});

export default RssItem;
