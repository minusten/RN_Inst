import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

export default class Tagging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: []
    };
  }
  render() {
    return (
      <View>
        <TextInput
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text
            .split(' ')
            .map(word => word && '🍕')
            .join(' ')}
        </Text>
      </View>
    );
  }
}
