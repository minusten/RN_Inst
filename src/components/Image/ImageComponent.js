/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Animated,
  PanResponder,
  TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import {
  addTag,
  addImages,
  deleteImg,
  deleteTag,
  addPosition
} from '../../redux/actions/actions';
import GalleryContainer from '../Gallery/GalleryContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        position.setOffset(position.__getValue());
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      }
    });
    this.state = {
      position,
      panResponder,
      pickedImage: '',
      savedImage: '',
      imageSource: '',
      imageName: '',
      uri: '',
      show: true,
      tag: [],
      text: '',
      showImg: false,
      showTags: false,
      // locationX: 0,
      // locationY: 0,
      location: {
        locationX: 0,
        locationY: 0
      }
    };
  }
  showTags = evt => {
    this.setState({
      showTags: !this.state.showTags,
      locationX: evt.nativeEvent.locationX,
      locationY: evt.nativeEvent.locationY
    });
    console.log('location', this.state.locationX);
    console.log('location', this.state.locationY);
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
      savedImage: this.props.pickedImage
    });
    let copyiedAray = this.props.images.slice();
    if (this.props.pickedImage) {
      copyiedAray.push(this.props.pickedImage);
      this.props.addImages(copyiedAray);
      this.setState({ show: false });
      Alert.alert('Image added');
    } else {
      Alert.alert('Pls, add img');
    }
    this.setState({
      savedImage: '',
      text: '',
      // tags: this.props.deleteTag(index), //Reducer
      goToGallery: !this.state.goToGallery
    });
  };
  setTags = evt => {
    // this.setState({
    //   locationX: evt.nativeEvent.locationX,
    //   locationY: evt.nativeEvent.locationY
    // });
    if (this.state.tag) {
      let tagsArr = this.props.tags.slice();
      tagsArr.push(this.state.text);
      this.props.addTag(tagsArr);
      console.log(tagsArr);
      let coordsArr = this.props.coords.slice();
      coordsArr.push(this.state.locationY);
      this.props.addPosition(coordsArr);
      console.log(coordsArr);
      this.setState({
        text: ''
      });
    } else {
      console.log('Tags not added');
    }
  };

  render() {
    let handles = this.state.panResponder.panHandlers;
    return (
      <View>
        {this.state.goToGallery ? (
          <GalleryContainer
            image={this.state.savedImage}
            tags={this.state.text}
            coordY={this.state.locationY}
            coordX={this.state.locationX}
          />
        ) : (
          <View>
            <View>
              <TouchableOpacity onPress={this.showTags}>
                <ImageBackground
                  source={this.props.pickedImage}
                  style={styles.previewImage}
                />

                {this.state.showTags ? (
                  <Animated.View
                    style={[this.state.position.getLayout()]}
                    {...handles}>
                    <View
                      style={{
                        position: 'absolute',
                        left: this.state.locationX,
                        top: this.state.locationY
                      }}>
                      <View style={styles.input}>
                        <Icon
                          name="smile-o"
                          size={20}
                          color="black"
                          onPress={this.setTags}
                        />
                        <TextInput
                          value={this.state.text}
                          onChangeText={text => this.setState({ text })}
                        />
                      </View>
                    </View>
                  </Animated.View>
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={this.pickImageHandler}>
                <Image
                  source={require('../../images/add.png')}
                  style={styles.img}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../images/cross.png')}
                  style={styles.img}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.setImage}>
                <Image
                  source={require('../../images/download.png')}
                  style={styles.img}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  },
  img: {
    height: 30,
    width: 30
  },
  previewImage: {
    borderWidth: 1,
    borderColor: 'black',
    width: 330,
    height: 530,
    marginLeft: -150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 2,
    left: 2
  },
  button: {
    width: 330,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginLeft: -150
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    height: 50,
    width: 150,
    marginTop: -450
  }
});

const mapStateToProps = state => {
  return {
    images: state.images.images,
    coords: state.coords.coords,
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
    tag: text => {
      dispatch(addTag(text));
    },
    deletetag: tag => {
      dispatch(deleteTag(tag));
    },
    coord: crd => {
      dispatch(addPosition(crd));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageComponent);
