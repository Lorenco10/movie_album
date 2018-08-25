import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerStyle: {
    flex: 0.1,
    backgroundColor: '#fff',
    elevation: 5,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000000',
    marginLeft: 80
  },
  backButtonStyle: {
    height: 60,
    width: 50,
    marginTop: 35,
    marginLeft: 15,
    marginRight: 10
  }
});
