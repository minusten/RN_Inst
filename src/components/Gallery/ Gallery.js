import React, {Component} from "react";
import {
StyleSheet,
View,
Button,
Text,
Image,
TouchableOpacity
} from "react-native";
import GeolocationComponent from '../Geolocation/Geolocation'

class Gallery extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      selectImg: false,
      showGeo: false
    }
  }
  selectImage = () => {
    this.setState({
      selectImg: !this.state.selectImg,
      showGeo: !this.state.showGeo
    })
    console.log(this.state.selectImg)
    console.log(this.state.showGeo)
  }
  render(){
  return (
    <View>
    <View style={styles.container}>
      {this.props.places.places.map((place, index) => {
       return (
        <View style={styles.photo} key={index} > 
        <TouchableOpacity onPress={this.selectImage} > 
         <Image source={place} style={[this.state.selectImg ? styles.bigStyle : styles.normalStyle ]}/> 
         <GeolocationComponent />
        </TouchableOpacity> 
        </View> 
      ) 
    })}    
    </View>
  </View>
  )
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
  marginTop:10
},
photo: {
  marginTop: 5
},
normalStyle: {
  width: 100,
  height: 100,
  marginTop: 5
},
bigStyle: {
  width: 360,
  height: 360,
  borderWidth: 30,
  borderColor: 'black'
},
notShowGeo: {
  display: 'none'
}
})


export default Gallery