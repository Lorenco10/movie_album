import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  YellowBox,
  Animated,
  Alert
} from 'react-native';
import axios from 'axios';
import FlatList, { ParallaxImage } from 'react-native-parallax-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import styles from './Styles/LaunchScreenStyles';

YellowBox.ignoreWarnings(['Warning:']);

class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      hidden: true,
      activeFilter: 'upcoming'
    };

    this.menuAnim = new Animated.Value(0);

    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.state.activeFilter
        }?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US&page=1`
      )
      .then(response => {
        this.setState({ movieList: response.data.results });
      });
  }

  animate(open) {
    Animated.timing(this.menuAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  keyExtractor = item => item.title;

  render() {
    const iconType = [
      { color: 'white', type: 'fire', name: 'popular' },
      { color: 'white', type: 'decagram', name: 'upcoming' },
      { color: 'white', type: 'finance', name: 'top_rated' },
      { color: 'white', type: 'theater', name: 'now_playing' }
    ];

    const translateX = this.menuAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-70, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent hidden />

        {/* {
          <FlatList
            data={this.state.movieList.slice(0, 16)}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.movieItem} activeOpacity={0.85} onPress={() => {}}>
                <ParallaxImage
                  style={[StyleSheet.absoluteFill]}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  }}
                  parallaxFactor={0.5}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        } */}
        <ScrollView style={{ flex: 1 }}>
          {this.state.movieList.map((prop, index) => {
            if (index <= 16) {
              return (
                <TouchableOpacity
                  style={styles.movieItem}
                  activeOpacity={0.85}
                  onPress={() => {}}
                  key={index}
                >
                  <ParallaxImage
                    style={[StyleSheet.absoluteFill]}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${prop.poster_path}`
                    }}
                    parallaxFactor={0.5}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.text}>{prop.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </ScrollView>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 240,
            width: 70,
            position: 'absolute',
            top: 250,
            transform: [{ translateX }]
          }}
        >
          {iconType.map((prop, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  //this.setState({ activeFilter: prop.name });
                  //this.setState({ hidden: !this.state.hidden });
                  //Alert.alert(this.state.activeFilter);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  width: 70,
                  backgroundColor: 'rgba(0,0,0, 0.8)'
                }}
                key={index}
              >
                <Icon name={prop.type} size={22} color={prop.color} />
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 70,
            position: 'absolute',
            top: 500,
            backgroundColor: 'rgba(255,255,255, 0.9)'
          }}
          onPress={() => {
            this.setState({ hidden: !this.state.hidden });
            this.animate(this.state.hidden);
          }}
        >
          <Icon name="filter" size={22} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default LaunchScreen;
