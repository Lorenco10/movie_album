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
  Linking,
  Alert
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
        )
      ])
      .then(
        axios.spread((videoRes, detailRes) => {
          this.setState({ videoId: videoRes.data.results[0].key, movieDetails: detailRes.data });
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
          style={{
            height: Metrics.screenHeight * 0.95,
            width: Metrics.screenWidth,
            justifyContent: 'center',
            position: 'absolute'
          }}
          resizeMode="cover"
        />
        <View
          style={{
            height: Metrics.screenHeight * 0.12,
            width: Metrics.screenWidth,
            position: 'absolute',
            top: Metrics.screenHeight * 0.4,
            backgroundColor: 'rgba(0,0,0, 0.7)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              marginLeft: '3%',
              fontSize: 20,
              fontFamily: 'monospace',
              fontWeight: '900',
              color: 'white'
            }}
          >
            {this.state.movieInfo.title}
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              width: Metrics.screenWidth * 0.98,
              backgroundColor: '#292836',
              elevation: 10,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginTop: Metrics.screenHeight * 0.85,
              paddingBottom: '20%'
              // transform: [{ translateY }]
            }}
            //onPress={() => {
            //this.setState({ cardTap: !this.state.cardTap }, () => {
            // this.animate(this.state.cardTap);
            //Alert.alert('pressed');
            //});
            // }}
          >
            <View
              style={{
                height: Metrics.screenHeight * 0.08,
                width: Metrics.screenWidth * 0.98,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: Metrics.screenHeight * 0.06,
                  width: Metrics.screenWidth * 0.75,
                  backgroundColor: '#494856',
                  borderTopLeftRadius: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    color: 'white'
                  }}
                >
                  {this.state.movieInfo.release_date
                    .split('-')
                    .reverse()
                    .join(' - ')}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Metrics.screenHeight * 0.06,
                  width: Metrics.screenWidth * 0.23,
                  backgroundColor: '#52a08d',
                  borderTopRightRadius: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    color: 'white'
                  }}
                >
                  {this.state.movieInfo.vote_average}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginTop: '2%',
                marginLeft: '8%',
                fontSize: 18,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Synopsis
            </Text>
            <Text
              style={{
                marginTop: '5%',
                marginLeft: '12%',
                marginRight: '10%',
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: 'normal',
                color: 'white'
              }}
            >
              {this.state.movieInfo.overview}
            </Text>
            <Text
              style={{
                marginTop: '5%',
                marginLeft: '8%',
                fontSize: 18,
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Trailer
            </Text>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${this.state.videoId}`
              }}
              style={{
                height: Metrics.screenHeight * 0.5,
                width: Metrics.screenWidth * 0.8,
                marginTop: '5%',
                marginLeft: '12%'
              }}
            />
            {!_.isEmpty(this.state.movieDetails) ? (
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginTop: '5%',
                    marginLeft: '8%',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Tags
                </Text>
                <View
                  style={{
                    flex: 0.5,
                    marginTop: '5%',
                    marginLeft: '12%',
                    marginRight: '10%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {this.state.movieDetails.genres.map(prop => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          elevation: 5,
                          height: Metrics.screenHeight * 0.07,
                          width: Metrics.screenWidth * 0.35,
                          backgroundColor: '#c1ceda',
                          borderRadius: 20
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            color: 'black'
                          }}
                        >
                          {prop.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <Text
                  style={{
                    marginTop: '5%',
                    marginLeft: '8%',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  RunTime
                </Text>
                <View
                  style={{
                    marginTop: '5%',
                    alignSelf: 'center',
                    elevation: 5,
                    height: Metrics.screenHeight * 0.05,
                    width: Metrics.screenWidth * 0.35,
                    backgroundColor: '#c1ceda',
                    borderRadius: 20
                  }}
                >
                  <Text
                    style={{
                      marginTop: '5%',
                      textAlign: 'center',
                      fontSize: 12,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >
                    {this.state.movieDetails.runtime} min
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: '5%',
                    marginLeft: '8%',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Budeget / Revenue
                </Text>
                <View
                  style={{
                    flex: 0.5,
                    marginTop: '5%',
                    marginLeft: '12%',
                    marginRight: '10%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      marginTop: '5%',
                      margin: '2%',
                      alignSelf: 'center',
                      elevation: 5,
                      height: Metrics.screenHeight * 0.05,
                      width: Metrics.screenWidth * 0.35,
                      backgroundColor: '#F44336',
                      borderRadius: 20
                    }}
                  >
                    <Text
                      style={{
                        marginTop: '5%',
                        textAlign: 'center',
                        fontSize: 12,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                    >
                      {this.state.movieDetails.budget !== null
                        ? this.state.movieDetails.budget
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : null}{' '}
                      $
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: '5%',
                      alignSelf: 'center',
                      margin: '2%',
                      elevation: 5,
                      height: Metrics.screenHeight * 0.05,
                      width: Metrics.screenWidth * 0.35,
                      backgroundColor: '#4CAF50',
                      borderRadius: 20
                    }}
                  >
                    <Text
                      style={{
                        marginTop: '5%',
                        textAlign: 'center',
                        fontSize: 12,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                    >
                      {this.state.movieDetails.revenue !== null
                        ? this.state.movieDetails.revenue
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : null}{' '}
                      $
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: '5%',
                    marginLeft: '8%',
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
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
                  style={{
                    marginTop: '5%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    height: Metrics.screenHeight * 0.05,
                    width: Metrics.screenWidth * 0.7,
                    backgroundColor: '#c1ceda',
                    borderRadius: 20
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >
                    {this.state.movieDetails.homepage !== null
                      ? this.state.movieDetails.homepage.slice(0, 30)
                      : null}{' '}
                    ...
                  </Text>
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
