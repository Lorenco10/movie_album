import React, { Component } from 'react';
import { View, TouchableOpacity, Text, WebView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WebScreenStyle';

class WebScreen extends Component {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => goBack()} style={styles.backButtonStyle}>
            <Icon name="arrow-left" size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>Stream Links</Text>
        </View>
        <WebView
          source={{
            uri: `https://crawler.to/view?imdb=${this.props.navigation.state.params.imdbId}`
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default WebScreen;
