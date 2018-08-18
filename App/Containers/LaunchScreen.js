import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  StyleSheet,
  YellowBox
} from 'react-native';
import axios from 'axios';
import FlatList, { ParallaxImage } from 'react-native-parallax-flatlist';
/* import CircleMenu from '@ramotion/react-native-circle-menu'; */
//import Icon from 'react-native-vector-icons/Ionicons';
import { Metrics } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

YellowBox.ignoreWarnings(['Warning:']);

class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: []
    };
  }

  componentWillMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1'
      )
      .then(response => {
        this.setState({ loading: false, movieList: response.data.results });
      });
  }

  onPress = index => console.warn(`${this.items[index].name} icon pressed!`);

  items = [
    {
      name: 'md-home',
      color: '#298CFF'
    },
    {
      name: 'md-search',
      color: '#30A400'
    },
    {
      name: 'md-time',
      color: '#FF4B32'
    },
    {
      name: 'md-settings',
      color: '#8A39FF'
    },
    {
      name: 'md-navigate',
      color: '#FF6A00'
    }
  ];

  keyExtractor = item => item.title;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          hidden
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />

        <FlatList
          data={this.state.movieList.slice(0, 15)}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: Metrics.screenHeight * 0.35,
                justifyContent: 'flex-end'
              }}
              activeOpacity={0.85}
              onPress={() => {}}
            >
              <ParallaxImage
                style={[StyleSheet.absoluteFill]}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
                }}
                parallaxFactor={1}
              />
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0, 0.3)'
                }}
              >
                <Text
                  style={{
                    marginLeft: '3%',
                    fontSize: 18,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <CircleMenu bgColor="#E74C3C" items={this.items} onPress={this.onPress} /> */}
      </View>
    );
  }
}

export default LaunchScreen;
