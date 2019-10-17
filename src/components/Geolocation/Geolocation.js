import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class GeolocationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: { lat: null, lng: null },
      error: null
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000
    };
    this.setState({ ready: false, error: null });
    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = position => {
    console.log(position.coords.latitude);
    console.log(this.state.where);
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude }
    });
  };
  geoFailure = err => {
    this.setState({ error: err.message });
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.ready && (
          <Text style={styles.big}>Using Geolocation in React Native.</Text>
        )}
        {this.state.error && (
          <Text style={styles.big}>Error: {this.state.error}</Text>
        )}
        {this.state.ready && (
          <Text style={styles.big}>
            Lat: {Math.round(this.state.where.lat)}
            <Text />
            Lng: {Math.round(this.state.where.lng)}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  big: {
    fontSize: 10,
    color: 'white'
    // marginTop: 5
  }
});
