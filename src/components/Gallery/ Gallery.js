/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import GeolocationComponent from '../Geolocation/Geolocation';
import { connect } from 'react-redux';
import { deleteImg, deleteTag } from '../../Root/actions/place';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectImg: false,
      showGeo: false,
      tags: []
    };
  }
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
  render() {
    return (
      <ScrollView vertical={true}>
        <View>
          <View style={styles.container}>
            {this.props.places.places.map((place, index) => {
              return (
                <View style={styles.photo} key={index}>
                  <TouchableOpacity onPress={this.selectImage}>
                    <TouchableOpacity onPress={e => this.deleteImage(e, index)}>
                      <Image
                        source={require('../../images/delete-button.png')}
                        style={styles.delete}
                      />
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>
                      {' '}
                      {this.props.tags.tags.map((tag, i) => {
                        return <Text key={i}> #{tag} </Text>;
                      })}{' '}
                    </Text>
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
    marginTop: 10,
    alignItems: 'flex-start'
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
    width: 340,
    height: 340,
    borderWidth: 10,
    borderColor: 'black'
  },
  notShowGeo: {
    display: 'none'
  },
  tags: {
    color: 'white'
  },
  delete: {
    height: 10,
    width: 10
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
