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
import { addPlace } from '../../Root/actions/place';
import { deleteImg } from '../../Root/actions/place';
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
      pickedImage: null
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

  setImage = () => {
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
    if (this.state.pickedImage) {
      copyiedAray.push(this.state.pickedImage);
      console.log('copyiedArr', copyiedAray);
      this.props.addPlace(copyiedAray);
      this.setState({ show: false });
      Alert.alert('Image added');
    } else {
      Alert.alert('Pls, add img');
    }
    this.setState({
      pickedImage: ''
    });
  };
  addTag = () => {
    const text = this.state.text.split();
    this.state.tags.push(text);
    console.log(this.state.tags);
    this.setState({
      text: ''
    });
  };

  render() {
    const { tags } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder="Enter tag"
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button title="Tag" onPress={this.addTag} />
          <Text>
            {' '}
            {tags.map((tag, index) => {
              return (
                <View key={index}>
                  <Text style={{ color: 'pink' }}>{tag}</Text>
                </View>
              );
            })}{' '}
          </Text>
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
        <Gallery image={this.state.savedImage} show={this.state.showImg} />
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
    width: 180,
    borderColor: '#DDD',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    color: '#FFF',
    // marginLeft: 210,
    // marginTop: -95,
    backgroundColor: '#c9c9c9'
  },
  // placeholder: {
  //   borderWidth: 1,
  //   borderColor: "black",
  //   backgroundColor: "white",
  //   width: 170,
  //   height: 100,
  //   marginTop: -10,
  //   borderRadius: 10
  //},
  button: {
    width: 200,
    marginTop: 45,
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addPlace(name));
    },
    delete: index => {
      dispatch(deleteImg(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage);
