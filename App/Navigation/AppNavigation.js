import { StackNavigator } from 'react-navigation';
import WebScreen from '../Containers/WebScreen';
import LaunchScreen from '../Containers/LaunchScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    WebScreen: { screen: WebScreen },
    LaunchScreen: { screen: LaunchScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
