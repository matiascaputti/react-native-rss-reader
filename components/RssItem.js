import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';

class RssItem extends React.Component {
  render() {
    return (
      <View style={styles.rssContainer}>

        <View style={styles.rssContainerLeft}>
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            Title title title title title title title title title title title title title title
          </Text>
          <Text
            style={styles.body}
            numberOfLines={3}
          >
            Content content content content content content content content content content content content content content content
          </Text>
          <Text style={styles.added}>30 minutes ago</Text>
        </View>

        <View style={styles.rssContainerRight}>
          <Image
            style={styles.image}
            source={{ uri: 'http://placeimg.com/401/401/any' }}
          />
        </View>

      </View>
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
    color: '#555',
    fontSize: 12,
    paddingTop: 7
  },

  added: {
    color: '#555',
    fontSize: 10,
    fontWeight: '500',
    paddingTop: 7
  },

  image: {
    flex: 1
  }
});

export default RssItem;
