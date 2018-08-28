import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Easing,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
  YellowBox,
  Animated,
  Linking
} from 'react-native';
import axios from 'axios';
import FlatList, { ParallaxImage } from 'react-native-parallax-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { Metrics } from '../Themes';
import styles from './Styles/LaunchScreenStyles';

YellowBox.ignoreWarnings(['Warning:']);

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      searchList: [],
      hidden: true,
      expanded: true,
      openWeb: false,
      searchWidth: new Animated.Value(70),
      activeFilter: '',
      text: '',
      imdbId: ''
    };

    this.menuAnim = new Animated.Value(0);
    this.searchAnim = new Animated.Value(0);

    this.animate = this.animate.bind(this);
    this.animateSearch = this.animateSearch.bind(this);
    //this.getId = this.getId.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US&page=1'
      )
      .then(response => {
        this.setState({ movieList: response.data.results });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.activeFilter !== nextState.activeFilter) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            nextState.activeFilter
          }?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US&page=1`
        )
        .then(response => {
          this.setState({ movieList: response.data.results });
        });
      return true;
    }
    if (this.state.text !== nextState.text) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US&query=${
            nextState.text
          }&page=1&include_adult=false`
        )
        .then(response => {
          this.setState({ searchList: response.data.results });
        });
      return true;
    }
    return true;
  }

  /*   getId(movieId) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=c0df16afa65f79c9ca68765047fdcd56`
      )
      .then(response => {
        this.setState({ imdbId: response.data.imdb_id }, () => {
          Linking.openURL(`https://crawler.to/view?imdb=${this.state.imdbId}`);
        });
      });
  } */

  animate(open) {
    Animated.timing(this.menuAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.back(0.01)),
      useNativeDriver: true
    }).start();
  }

  animateSearch(expand) {
    Animated.timing(
      this.state.searchWidth,
      {
        toValue: expand ? Metrics.screenWidth * 0.95 : 70,
        duration: 300,
        easing: Easing.out(Easing.back(0.01))
      },
      {
        useNativeDriver: true
      }
    ).start(() => {
      setTimeout(() => {
        this.setState({ expanded: !this.state.expanded, text: '' });
      }, 1);
    });
  }

  keyExtractor = item => item.title;

  render() {
    const { navigation } = this.props;
    const searchWidth = this.state.searchWidth;
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
        <FlatList
          data={this.state.movieList.slice(0, 16)}
          extraData={this.state}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItem}
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate('MovieDetailScreen', {
                  movieInfo: item
                });
              }}
            >
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
        <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
          {iconType.map((prop, index) => {
            return (
              <TouchableOpacity
                onPress={
                  prop.name !== this.state.activeFilter
                    ? () => {
                        this.setState({ activeFilter: prop.name });
                        //Alert.alert(this.state.activeFilter);
                      }
                    : null
                }
                style={styles.iconContainer}
                key={index}
              >
                <Icon name={prop.type} size={22} color={prop.color} />
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            this.setState({ hidden: !this.state.hidden });
            this.animate(this.state.hidden);
          }}
        >
          <Icon name="filter" size={22} color="black" />
        </TouchableOpacity>
        {this.state.text !== '' ? (
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.searchItemsContainer}>
              {this.state.searchList.map(prop => {
                return (
                  <TouchableOpacity
                    style={styles.searchMovieItem}
                    onPress={() => {
                      navigation.navigate('MovieDetailScreen', {
                        movieInfo: prop
                      });
                      //this.getId(prop.id);
                      //Linking.openURL(`https://crawler.to/search/${prop.title}`);
                    }}
                  >
                    <View style={styles.searchTitleContainer}>
                      <Text style={styles.searchText}>{prop.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : null}
        <AnimatedTouchableOpacity
          style={[styles.searchButton, { width: searchWidth }]}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={styles.searchButtonContainer}
            onPress={() => {
              this.animateSearch(this.state.expanded);
            }}
          >
            <Icon name="magnify" size={22} color="black" />
          </TouchableOpacity>
          {!this.state.expanded ? (
            <TextInput
              maxLength={50}
              placeholder="Search Movies"
              underlineColorAndroid="rgba(255,255,255, 0.0)"
              style={styles.textInput}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          ) : null}
        </AnimatedTouchableOpacity>
      </View>
    );
  }
}

export default LaunchScreen;
