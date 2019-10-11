
import React, {Component} from "react";
import {
StyleSheet,
View,
Button,
Text,
Image, TouchableOpacity
} from "react-native";
import ImagePicker from 'react-native-image-picker'
import Gallery from "../Gallery/GalleryContainer";
import GalleryContainer from "../Gallery/GalleryContainer";
import { connect } from 'react-redux'
import { addPlace } from '../../Root/actions/place'
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
        initialPosition: 'unknown',
        show: true

      };
    }
    componentDidMount() {
      Geolocation.getCurrentPosition(
        position => {
          const initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
        },
        error => Alert.alert('Error', JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }

    reset = () => {
      this.setState({
        pickedImage: null
      });
    }
    pickImageHandler = () => {
      ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          console.log('RES DATA', res.data)
          this.setState({
            pickedImage: { uri: res.uri }
          });
        
        }
      })
    }
  
    setImage = () => {
    const file = {
      uri: this.state.imageSource,
      name: this.state.imageName,
      type: "image/jpg;base64"
    }
    const data = new FormData();
    data.append("file", file)
        this.setState({
            savedImage: this.state.pickedImage
      })
      let copyiedAray = this.props.places.slice()
      if (this.state.pickedImage) {
        copyiedAray.push(this.state.pickedImage)
        console.log('copyiedArr', copyiedAray)
        this.props.addPlace(copyiedAray)
        this.setState({ show: false })
        alert('Image added')
      } else {
        alert('Pls, add img')
      }
    }
    
    render() {
      return (
        <View> 
        <View style={styles.container}>
          <View style={styles.placeholder}>
            <Image source={this.state.pickedImage} style={styles.previewImage} />
           
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.pickImageHandler}>
              <Image source={require('../../images/add.png')} style={styles.img} />
           </TouchableOpacity>
            <TouchableOpacity onPress={this.reset} >
              <Image source={require('../../images/cross.png')} style={styles.cross} />
           </TouchableOpacity>
            <TouchableOpacity onPress={this.setImage}  >
              <Image source={require('../../images/download.png')} style={styles.cross} />
           </TouchableOpacity>
          </View>
          </View>
        <Gallery image={this.state.savedImage} position={this.state.initialPosition}/>
        </View>
      )
    }
  }
    const styles = StyleSheet.create({
        container: {
          display: 'flex',
          alignItems:"flex-start",
          marginTop: -210,
          marginLeft: 200,
          width: '100%',
        },
        textStyle: {
          fontWeight:"bold",
          fontSize:20,
          textAlign:"center",
          color:"#fff",
        },
        placeholder: {
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: "white",
          width: 200,
          height: 110,
          marginTop:10,
          borderRadius: 10
        },
        button: {
          width: 200,
          marginTop:55,
          flexDirection:"row",
          justifyContent: "space-around",
          
        },
        previewImage: {
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: '#c9c9c9',
          width: 200,
          height: 150,
          marginTop:10,
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
          }
        }
        
        const mapDispatchToProps = dispatch => {
          return {
            add: (name) => {
              dispatch(addPlace(name))
            }
          }
        }

        export default connect(mapStateToProps, mapDispatchToProps)(AddImage)
