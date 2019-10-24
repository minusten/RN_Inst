/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageContainer from '../Image/ImageContainer';
import { connect } from 'react-redux';
import { addImages, addTag } from '../../redux/actions/actions';
import { deleteImg, deleteTag } from '../../redux/actions/actions';
import Geolocation from '@react-native-community/geolocation';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedImage: '',
      savedImage: '',
      imageSource: '',
      imageName: '',
      uri: '',
      images: [],
      placaName: '',
      show: true,
      tags: [],
      text: '',
      showImg: false,
      downloadedImg: false
    };
  }
  componentDidMount() {
    console.log(this.state.tags);
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  reset = () => {
    this.setState({
      savedImage: null,
      text: ''
    });
  };
  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          console.log('RES DATA', res.data);
          this.setState({
            pickedImage: { uri: res.uri }
          });
        }
      }
    );
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          {!this.state.pickedImage ? (
            <TouchableOpacity onPress={this.pickImageHandler}>
              <Image
                source={require('../../images/add.png')}
                style={styles.img}
              />
            </TouchableOpacity>
          ) : (
            <ImageContainer
              pickedImage={this.state.pickedImage}
              style={styles.image}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: -210,
    marginLeft: 170
    // width: '100%'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 150,
    width: 150
  },
  pickDisplay: {
    display: 'none'
  }
});

const mapStateToProps = state => {
  return {
    images: state.images.images,
    tags: state.tags.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addImages(name));
    },
    delete: index => {
      dispatch(deleteImg(index));
    },
    tag: name => {
      dispatch(addTag(name));
    },
    deletetag: tag => {
      dispatch(deleteTag(tag));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage);
