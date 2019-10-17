/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import GeolocationComponent from '../Geolocation/Geolocation';
import { connect } from 'react-redux';
import { deleteImg } from '../../Root/actions/place';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectImg: false,
      showGeo: false
    };
  }
  selectImage = () => {
    this.setState({
      selectImg: !this.state.selectImg,
      showGeo: !this.state.showGeo
    });
    console.log(this.state.selectImg);
    console.log(this.state.showGeo);
  };
  deleteImage = (e, index) => {
    let newArr = this.props.places.places.pop(index);
    this.props.deleteImg();
  };
  render() {
    return (
      <ScrollView vertical={true}>
        <View>
          <View style={styles.container}>
            {this.props.places.places.map((place, index) => {
              return (
                <View style={styles.photo} key={index}>
                  <TouchableOpacity onPress={this.selectImage}>
                    <TouchableOpacity onPress={this.deleteImage}>
                      <Image
                        source={require('../../images/delete-button.png')}
                        style={styles.delete}
                      />
                    </TouchableOpacity>
                    <Image
                      source={place}
                      style={[
                        this.state.selectImg
                          ? styles.bigStyle
                          : styles.normalStyle
                      ]}
                    />
                    <GeolocationComponent />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10
  },
  // photo: {
  //   marginTop: 5
  // },
  normalStyle: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'flex-start'
    // marginTop: 5
  },
  bigStyle: {
    width: 350,
    height: 350,
    borderWidth: 10,
    borderColor: 'black'
  },
  notShowGeo: {
    display: 'none'
  },
  delete: {
    height: 10,
    width: 10
  }
});
const mapDispatchToProps = dispatch => {
  return {
    delete: index => {
      dispatch(deleteImg(index));
    }
  };
};

export default connect(mapDispatchToProps)(Gallery);
