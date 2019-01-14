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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const intensityOptions = [
    {
        label: 'strength',
        value: 'Strength'
    },
    {
        label: 'mobility',
        value: 'Mobility'
    }
];


export default class IntensityScreen extends Component {
  constructor() {
    super();

    this.state = {
      value: 'Strength'
    };
  }

  render() {
    const { practice } = this.state;
    return (
      <View >
        <Text>Choose the goal for your practice today: {this.state.value}</Text>
          <View style={{ marginHorizontal: 10, backgroundColor: "#E7E7E7" }} >
            <RadioForm
              radio_props={intensityOptions}
              initial={0}
              onPress={(value) => {this.setState({value:value})}}
            />
          </View>
          <Button
            title="Next"
            onPress={() => {
              this.props.navigation.navigate('Targets', {
                practice: this.state.value
              });
            }}
          />
          <Button
             title="Go back"
             onPress={() => this.props.navigation.goBack()}
          />
     </View>
    );
  }
}
