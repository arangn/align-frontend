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

const targetOptions = [
    {
        label: 'hamstrings',
        value: 'Hamstrings'
    },
    {
        label: 'quads',
        value: 'Quads'
    },
    {
        label: 'calves',
        value: 'Calves'
    },
    {
        label: 'chest',
        value: 'Chest'
    },
    {
        label: 'back',
        value: 'Back'
    },
    {
        label: 'shoulders',
        value: 'Shoulders'
    },
    {
        label: 'abdominals',
        value: 'Abdominals'
    }
];

export default class TargetsScreen extends Component {
  constructor() {
    super();

    this.state = {
      targets: []
    };
  }


  setTargets = () => {
    const { navigation } = this.props;
    const practice = navigation.getParam('practice')
    let tempTargetsList = []
    targetOptions.forEach((element) => {
      if (element.RNchecked == true)
      tempTargetsList.push(element.label)
    })
    this.setState({targets: tempTargetsList});
    // console.log('state', this.state.targets, tempTargetsList)
    this.props.navigation.navigate('Loading', {
      practice: practice,
      targets: tempTargetsList
    })
  }

  render() {
    return (
      <View >
        <Text>Choose the areas you would like to target</Text>
          <CheckboxFormX
              style={{ width: 350 - 30 }}
              dataSource={targetOptions}
              itemShowKey="label"
              itemCheckedKey="RNchecked"
              iconSize={16}
          />
        <Button title="Go back"
        onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Create"
          onPress={() => {this.setTargets()}
        }
        />

     </View>
    );
  }
}


// targetOptions.forEach((element) => {
//   let tempTargetsList = []
//   if (element.RNchecked === 'true')
//   tempTargetsList.push(element)
//   this.setState({targets:tempTargetsList})
