import React, {Component} from "react";
import {
StyleSheet,
View,
Button,
Text,
Image, ScrollView
} from "react-native";

const Gallery = (props) => { 
  console.log('props', props)
  return (
    <View> 
    <View style={styles.container}>
      {props.places.places.map((place, index) => {
       return (
        <View style={styles.photo}> 
          {/* <Text> {props.position} </Text> */}
          <Image source={place} key={index} style={{width: 100, height: 100}}/> 
        </View> 
      ) 
    })}    
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
container: {
  alignItems:"center",
  backgroundColor: 'black',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 20,
  width: '100%',
  flexWrap: 'wrap',
  marginTop:10
},
photo: {
 marginRight: 10,
 marginLeft: 10,
}
})

export default Gallery