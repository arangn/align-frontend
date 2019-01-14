import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

export default class LoadingScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    const { navigation } = this.props;
    const practice = navigation.getParam('practice')
    const targets = navigation.getParam('targets')

    fetch('https://localhost', {
      method: 'POST',
      body: JSON.stringify({
        practice: practice,
        targets: targets,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });

  }



  render() {
    return (
      <View>
      <Text>Creating your routine</Text>
      </View>
    );
  }
}
