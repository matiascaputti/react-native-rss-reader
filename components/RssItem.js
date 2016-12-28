 import React from 'react';
 import { View, Text, TouchableOpacity,
         ActivityIndicator, StyleSheet } from 'react-native';
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

     this.handlePress = this.handlePress.bind(this);
     this.handleLongPress = this.handleLongPress.bind(this);
   }

   componentDidMount() {
     const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
     const { url } = this.props;

     fetch(parseUrl + url)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        title: json.feed.title,
        description: json.feed.description,
        link: json.feed.link,
        image: json.feed.image,
        entries: json.items,
        isLoading: false
      });
    });
   }

   handlePress() {
     const { title, entries } = this.state;
     this.props.navigator.push('feed', { title, entries });
   }

   handleLongPress() {
   }

   render() {
     return (
       <TouchableOpacity
         onPress={this.state.isLoading ? () => {} : this.handlePress}
         onLongPress={this.state.isLoading ? () => {} : this.handleLongPress}
       >
         <View style={[styles.rssContainer, { backgroundColor: this.props.color }]}>
           { this.state.isLoading ?
             <ActivityIndicator color={'#FFF'} style={styles.activityIndicator} /> :
             <View>
               <Text style={styles.title} numberOfLines={2} >
                 {this.state.title}
               </Text>

               <Text style={styles.body} numberOfLines={3} >
                 {this.state.description}
               </Text>

               <Text style={styles.footer}>
                 {this.state.link}
               </Text>
             </View>
           }
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
   },

   activityIndicator: {
     padding: 15
   }
 });

 export default RssItem;
