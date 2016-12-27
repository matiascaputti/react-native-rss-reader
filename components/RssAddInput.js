import React from 'react';
import { View, TextInput, TouchableOpacity,
         StyleSheet } from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

class RssAddInput extends React.Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={'Add new feed URL...'}
          onChangeText={() => {}}
          value={this.props.rssUrl}
          autoCorrect={false}
          autoCapitalize="none"
          underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {}}
        >
          <Ionicons
            name={'md-add-circle'}
            size={24}
            color={'#CCC'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDD'
  },

  textInput: {
    flex: 1,
    height: 40,
    fontSize: 13,
    padding: 10
  },

  iconContainer: {
    marginRight: 10,
    padding: 5
  }
});

export default RssAddInput;
