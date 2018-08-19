import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  movieItem: {
    height: Metrics.screenHeight * 0.35,
    justifyContent: 'flex-end'
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
  }
});
