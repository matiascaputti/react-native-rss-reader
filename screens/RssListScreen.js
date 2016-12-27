import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RssAddInput from '../components/RssAddInput';
import RssList from '../components/RssList';

class RssListScreen extends React.Component {
  constructor() {
    super();

    this.rssList = [
      'https://www.reddit.com/r/news/.rss',
      'https://www.reddit.com/r/learnprogramming/new/.rss',
      'https://www.reddit.com/r/learnpython/.rss',
      'https://www.quora.com/profile/Santiago-Basulto/rss',
      'https://www.quora.com/profile/Martin-Zugnoni/rss'
    ];
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <RssAddInput />

        <RssList urls={this.rssList} />
      </View>
    );
  }
}

RssListScreen.route = {
  navigationBar: {
    visible: true,
    title: 'RSS Reader',
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

export default RssListScreen;
