/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Gallery from '../Gallery/GalleryContainer';
import { connect } from 'react-redux';
import { addPlace, addTag } from '../../Root/actions/place';
import { deleteImg, deleteTag } from '../../Root/actions/place';
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
      addImage: false,
      places: [],
      placaName: '',
      show: true,
      tags: [],
      text: '',
      showImg: false
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
      pickedImage: null,
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

  setImage = index => {
    const file = {
      uri: this.state.imageSource,
      name: this.state.imageName,
      type: 'image/jpg;base64'
    };
    const data = new FormData();
    data.append('file', file);
    this.setState({
      savedImage: this.state.pickedImage
    });
    let copyiedAray = this.props.places.slice();
    let tagsArr = this.props.tags.tags.slice();
    if (this.state.pickedImage) {
      copyiedAray.push(this.state.pickedImage);
      tagsArr.push(this.state.text);
      this.props.addPlace(copyiedAray);
      this.props.addTag(tagsArr);
      this.setState({ show: false });
      Alert.alert('Image added');
    } else {
      Alert.alert('Pls, add img');
    }
    this.setState({
      pickedImage: '',
      text: '',
      tags: this.props.deleteTag(index) //Reducer
    });
  };
  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder="Enter tag"
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <View style={styles.placeholder}>
            <Image
              source={this.state.pickedImage}
              style={styles.previewImage}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.pickImageHandler}>
              <Image
                source={require('../../images/add.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.reset}>
              <Image
                source={require('../../images/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.setImage}>
              <Image
                source={require('../../images/download.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Gallery
          image={this.state.savedImage}
          show={this.state.showImg}
          tags={this.state.text}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: -310,
    marginLeft: 170,
    width: '100%'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    height: 35,
    width: 200,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    color: '#FFF',
    // marginLeft: 210,
    marginTop: 85,
    backgroundColor: '#c9c9c9'
  },
  button: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  previewImage: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#c9c9c9',
    width: 200,
    height: 130,
    marginTop: 10,
    borderRadius: 10
  },
  img: {
    height: 30,
    width: 30
  },
  cross: {
    height: 20,
    width: 20,
    marginTop: 5
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places
    // tags: state.tags.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addPlace(name));
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
