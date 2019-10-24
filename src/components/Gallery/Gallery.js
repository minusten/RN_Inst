/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  ImageBackground
} from 'react-native';
import GeolocationComponent from '../Geolocation/Geolocation';
import { connect } from 'react-redux';
import { deleteImg, deleteTag } from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddImageContainer from '../AddImage/AddImageContainer';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectImg: false,
      showGeo: false,
      tagsShow: false,
      addImage: false,
      coords: []
    };
  }

  addImage = () => {
    this.setState({
      addImage: !this.state.addImage
    });
  };
  selectImage = () => {
    this.setState({
      selectImg: !this.state.selectImg,
      showGeo: !this.state.showGeo
    });
    console.log(this.state.selectImg);
    console.log(this.state.showGeo);
    console.log(this.state.tags);
  };
  deleteImage = (e, index) => {
    e.preventDefault();
    this.props.deleteImg(index);
    this.props.deleteTag(index);
  };
  showTags = () => {
    this.setState({
      tagsShow: !this.state.tagsShow,
      coords: this.props.coords.coords
    });
    console.log('AAAA', this.state.coords);
    console.log(this.props.tags);
  };
  render() {
    return (
      <View>
        {/* <View style={styles.addImage}>
          <Text>
            {' '}
            <AddImageContainer />{' '}
          </Text>
        </View> */}
        <ScrollView vertical={true}>
          <View>
            <View style={styles.container}>
              {this.props.images.images.map((image, index) => {
                return (
                  <View style={styles.photo} key={index}>
                    <TouchableOpacity onPress={this.showTags}>
                      <TouchableOpacity
                        onPress={e => this.deleteImage(e, index)}>
                        <Image
                          source={require('../../images/delete-button.png')}
                          style={styles.delete}
                        />
                      </TouchableOpacity>

                      <ImageBackground
                        source={image}
                        // style={[
                        //   this.state.selectImg
                        //     ? styles.bigStyle
                        //     : styles.normalStyle
                        // ]}
                        style={styles.normalStyle}>
                        {this.state.tagsShow ? (
                          <Text>
                            {this.props.tags.tags.map((tag, i) => {
                              return (
                                <View>
                                  {/* <Icon name="meh-o" size={15} color="black" /> */}
                                  {this.props.coords.coords.map((coord, k) => {
                                    return (
                                      <TextInput
                                        value={tag}
                                        style={{
                                          // position: 'absolute',
                                          left: coord,
                                          top: coord,
                                          color: 'white',
                                          // backgroundColor: 'white',
                                          // borderRadius: 5,
                                          // borderColor: 'black',
                                          // height: 40,
                                          // width: 80
                                        }}
                                      />
                                    );
                                  })}
                                </View>
                              );
                            })}
                          </Text>
                        ) : null}
                      </ImageBackground>

                      {/* <GeolocationComponent /> */}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
// const { coords } = this.props;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    // backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 20,
    width: '100%',
    flexWrap: 'wrap',
    // marginTop: -50,
    // marginLeft: -150,
    alignItems: 'flex-start'
  },
  photo: {
    marginTop: 5
  },
  normalStyle: {
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'flex-start',
    // marginTop: 210,
    // marginLeft: 50
  },
  bigStyle: {
    width: 340,
    height: 340,
    borderWidth: 10,
    borderColor: 'black',
    marginTop: 210,
    marginRight: 150
  },
  notShowGeo: {
    display: 'none'
  },
  delete: {
    height: 10,
    width: 10
  },
  // addImage: {
  //   width: 240,
  //   height: 240,
  //   marginTop: 150,
  //   marginLeft: -150
  // },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    height: 50,
    width: 150
  },
  tagsContainer: {
    // marginLeft: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    deleteimg: place => {
      dispatch(deleteImg(place));
    },
    deletetag: tag => {
      dispatch(deleteTag(tag));
    }
  };
};

export default connect(mapDispatchToProps)(Gallery);
