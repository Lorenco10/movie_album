import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    width: 70,
    position: 'absolute',
    top: 250
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 70,
    position: 'absolute',
    top: 500,
    backgroundColor: 'rgba(255,255,255, 0.9)'
  },
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    width: Metrics.screenWidth * 0.65
  },
  searchButtonContainer: {
    height: 50,
    width: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
    position: 'absolute',
    top: Metrics.screenHeight * 0.03,
    left: 5,
    backgroundColor: 'rgba(255,255,255, 0.9)'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 70,
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  movieItem: {
    height: Metrics.screenHeight * 0.35,
    justifyContent: 'flex-end'
  },
  scrollContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 1.2, //correct value -> just the screen height
    position: 'absolute',
    paddingTop: Metrics.screenHeight * 0.15,
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  searchMovieItem: {
    height: Metrics.screenHeight * 0.1,
    width: Metrics.screenWidth,
    paddingRight: Metrics.screenWidth * 0.05,
    paddingLeft: Metrics.screenWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchItemsContainer: {
    flex: 1,
    paddingBottom: Metrics.screenHeight * 0.4
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)'
  },
  text: {
    marginLeft: '3%',
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'white'
  },
  searchText: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: 'white'
  }
});
