 import React from 'react';
 import { View, Text, TouchableOpacity,
         StyleSheet } from 'react-native';
 import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
 class RssItem extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       url: this.props.url,
       title: '',
       description: '',
       link: '',
       entries: [],
       color: this.props.color,
       isLoading: true
     };

     this.goToFeed = this.goToFeed.bind(this);
   }

   componentDidMount() {
     const parseUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=';
     const { url } = this.props;

     fetch(parseUrl + url)
    .then(response => response.json())
    .then((json) => {
      const { feed } = json.responseData;

      this.setState({
        title: feed.title,
        description: feed.description,
        link: feed.link,
        entries: feed.entries,
        isLoading: false
      });
    });
   }

   goToFeed() {
     this.props.navigator.push('feed', { a: 1, b: 2 });
   }

   render() {
     return (
       <TouchableOpacity onPress={this.goToFeed}>
         <View style={[styles.rssContainer, { backgroundColor: this.props.color }]}>

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
           <Text style={styles.footer}>
             {this.state.link}
           </Text>
         </View>
       </TouchableOpacity>
     );
   }
}

 const styles = StyleSheet.create({
   rssContainer: {
     flexDirection: 'column',
     backgroundColor: 'transparent',
     borderBottomWidth: 1,
     borderColor: '#EEE',
     marginBottom: 5,
     padding: 7
   },

   title: {
     color: '#FFF',
     fontSize: 16,
     fontWeight: '600'
   },

   body: {
     color: '#FFF',
     fontSize: 12,
     paddingTop: 7
   },

   footer: {
     color: '#FFF',
     fontSize: 10,
     fontWeight: '500',
     paddingTop: 7
   }
 });

 export default RssItem;
