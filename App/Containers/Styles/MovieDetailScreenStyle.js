import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  poster: {
    height: Metrics.screenHeight * 0.95,
    width: Metrics.screenWidth,
    justifyContent: 'center',
    position: 'absolute'
  },
  titleBox: {
    height: Metrics.screenHeight * 0.12,
    width: Metrics.screenWidth,
    position: 'absolute',
    top: Metrics.screenHeight * 0.4,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    marginLeft: '3%',
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: '900',
    color: 'white'
  },
  card: {
    flex: 1,
    width: Metrics.screenWidth * 0.98,
    backgroundColor: Colors.card,
    elevation: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: Metrics.screenHeight * 0.85,
    paddingBottom: '20%'
  },
  headerBox: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.98,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenWidth * 0.75,
    backgroundColor: Colors.date,
    borderTopLeftRadius: 5
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: 'white'
  },
  rateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenWidth * 0.23,
    backgroundColor: Colors.rate,
    borderTopRightRadius: 5
  },
  rateText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: 'white'
  },
  sectionText: {
    marginTop: '5%',
    marginLeft: '8%',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white'
  },
  overview: {
    marginTop: '5%',
    marginLeft: '12%',
    marginRight: '10%',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    color: 'white'
  },
  trailerBox: {
    height: Metrics.screenHeight * 0.3,
    width: Metrics.screenWidth * 0.8,
    marginTop: '5%',
    marginLeft: '12%'
  },
  tagsBox: {
    flex: 0.5,
    marginTop: '5%',
    marginLeft: '12%',
    marginRight: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.screenWidth * 0.01,
    elevation: 5,
    height: Metrics.screenHeight * 0.05,
    width: Metrics.screenWidth * 0.35,
    backgroundColor: Colors.textBox,
    borderRadius: 20
  },
  tagText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black'
  },
  castImg: {
    height: Metrics.screenHeight * 0.12,
    width: Metrics.screenWidth * 0.12,
    borderRadius: 30
  },
  castBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    elevation: 5,
    height: Metrics.screenHeight * 0.22,
    width: Metrics.screenWidth * 0.2
  }
});
