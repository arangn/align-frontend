import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';


export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>Welcome</Text>
        <Text>Create your own yoga practice</Text>
        <Button onPress={() => this.props.navigation.navigate('Intensity')} title="Next"/>
      </View>
    )
  }
};
