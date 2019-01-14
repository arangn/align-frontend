 // react stuff
import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
 // my stuff
import HomeScreen from './components/HomeScreen';
import IntensityScreen from './components/IntensityScreen';
import TargetsScreen from './components/TargetsScreen';
import SequenceScreen from './components/SequenceScreen';
import LoadingScreen from './components/LoadingScreen';


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Intensity: IntensityScreen,
    Targets: TargetsScreen,
    Loading: LoadingScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
