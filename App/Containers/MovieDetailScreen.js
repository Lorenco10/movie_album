import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  //Animated,
  Image,
  //Easing,
  //TouchableWithoutFeedback,
  TouchableOpacity,
  WebView,
  Linking
  //Alert
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Metrics } from '../Themes';
import styles from './Styles/MovieDetailScreenStyle';

class MovieDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieInfo: props.navigation.state.params.movieInfo,
      movieDetails: {},
      cast: [],
      crew: [],
      //cardTap: false,
      videoId: ''
    };

    /* this.cardAnim = new Animated.Value(0);

    this.animate = this.animate.bind(this); */
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${
            this.state.movieInfo.id
          }/videos?api_key=c0df16afa65f79c9ca68765047fdcd56`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${
            this.state.movieInfo.id
          }?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${
            this.state.movieInfo.id
          }/credits?api_key=c0df16afa65f79c9ca68765047fdcd56&language=en-US`
        )
      ])
      .then(
        axios.spread((videoRes, detailRes, creditRes) => {
          this.setState({
            videoId: videoRes.data.results[0].key,
            movieDetails: detailRes.data,
            cast: creditRes.data.cast,
            crew: creditRes.data.crew
          });
        })
      );
  }

  /*   animate() {
    Animated.timing(this.cardAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.back(0.01)),
      useNativeDriver: true
    }).start();
  } */
  render() {
    /* const opacity = this.cardAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    }); */
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <StatusBar translucent hidden />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${this.state.movieInfo.poster_path}`
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{this.state.movieInfo.title}</Text>
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            style={styles.card}
            //onPress={() => {
            //this.setState({ cardTap: !this.state.cardTap }, () => {
            // this.animate(this.state.cardTap);
            //Alert.alert('pressed');
            //});
            // }}
          >
            <View style={styles.headerBox}>
              <View style={styles.dateBox}>
                <Text style={styles.dateText}>
                  {this.state.movieInfo.release_date
                    .split('-')
                    .reverse()
                    .join(' - ')}
                </Text>
              </View>
              <View style={styles.rateBox}>
                <Text style={styles.rateText}>{this.state.movieInfo.vote_average}</Text>
              </View>
            </View>
            <Text style={styles.sectionText}>Synopsis</Text>
            <Text style={styles.overview}>{this.state.movieInfo.overview}</Text>
            <Text style={styles.sectionText}>Trailer</Text>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${this.state.videoId}`
              }}
              style={styles.trailerBox}
            />
            {!_.isEmpty(this.state.movieDetails) &&
            !_.isEmpty(this.state.cast) &&
            !_.isEmpty(this.state.crew) ? (
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionText}>Cast</Text>
                <View
                  style={[
                    styles.tagsBox,
                    {
                      marginLeft: '8%',
                      marginRight: '5%',
                      marginTop: 0,
                      paddingTop: Metrics.screenHeight * 0.06
                    }
                  ]}
                >
                  {this.state.cast.slice(0, 4).map(prop => {
                    return (
                      <View style={styles.castBox}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w92${prop.profile_path}`
                          }}
                          style={styles.castImg}
                          resizeMode="contain"
                        />
                        <Text style={[styles.tagText, { color: 'white', marginTop: '10%' }]}>
                          {prop.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.sectionText}>Tags</Text>
                <View style={styles.tagsBox}>
                  {this.state.movieDetails.genres.map(prop => {
                    return (
                      <View style={styles.tagBox}>
                        <Text style={styles.tagText}>{prop.name}</Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.sectionText}>RunTime</Text>
                <View style={[styles.tagBox, { alignSelf: 'center' }]}>
                  <Text style={styles.tagText}>{this.state.movieDetails.runtime} min</Text>
                </View>
                <Text style={styles.sectionText}>Budget / Revenue</Text>
                <View style={styles.tagsBox}>
                  <View style={[styles.tagBox, { backgroundColor: '#F44336' }]}>
                    <Text style={[styles.tagText, { color: 'white' }]}>
                      {this.state.movieDetails.budget !== null
                        ? this.state.movieDetails.budget
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : null}{' '}
                      $
                    </Text>
                  </View>
                  <View style={[styles.tagBox, { backgroundColor: '#4CAF50' }]}>
                    <Text style={[styles.tagText, { color: 'white' }]}>
                      {this.state.movieDetails.revenue !== null
                        ? this.state.movieDetails.revenue
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : null}{' '}
                      $
                    </Text>
                  </View>
                </View>
                <Text style={[styles.sectionText, { marginBottom: Metrics.screenWidth * 0.05 }]}>
                  Homepage
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={
                    this.state.movieDetails.homepage
                      ? () => {
                          Linking.openURL(this.state.movieDetails.homepage);
                        }
                      : null
                  }
                  style={[
                    styles.tagBox,
                    {
                      alignSelf: 'center',
                      height: Metrics.screenHeight * 0.05,
                      width: Metrics.screenWidth * 0.7
                    }
                  ]}
                >
                  <Text style={styles.tagText}>
                    {this.state.movieDetails.homepage !== null
                      ? this.state.movieDetails.homepage.slice(0, 30)
                      : null}{' '}
                    ...
                  </Text>
                </TouchableOpacity>
                <Text style={styles.sectionText}>Watch</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Linking.openURL('https://www.google.com/maps/search/cinema');
                  }}
                  style={[
                    styles.tagBox,
                    {
                      height: Metrics.screenHeight * 0.05,
                      width: Metrics.screenWidth * 0.3,
                      backgroundColor: '#E53935',
                      alignSelf: 'center'
                    }
                  ]}
                >
                  <Text style={[styles.tagText, { color: 'white' }]}>Cinemas</Text>
                </TouchableOpacity>
                <Text style={styles.sectionText}>Stream</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Linking.openURL(
                      `https://videospider.in/getvideo?key=Eqvv2uJrorySaQeS&video_id=${
                        this.state.movieDetails.id
                      }&tmdb=1`
                    );
                  }}
                  style={[
                    styles.tagBox,
                    {
                      height: Metrics.screenHeight * 0.05,
                      width: Metrics.screenWidth * 0.4,
                      backgroundColor: '#03A9F4',
                      alignSelf: 'center'
                    }
                  ]}
                >
                  <Text style={[styles.tagText, { color: 'white' }]}>Openload</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MovieDetailScreen;
