import React, {Component} from "react";
import {
StyleSheet,
View,
Button,
Text,
Image, TouchableOpacity
} from "react-native";
import AddImageContainer from '../AddImage/AddImageContainer'
import AddImage from "../AddImage/AddImage"
import Gallery from '../Gallery/GalleryContainer'
export default class User extends Component {

constructor(props) {
 super(props);
 this.state = {
    show: false,
    username: '',
    user_picture: ''
  };
}

showMenu = () => {
  this.setState({
    show: !this.state.show
  })
  console.log(this.state.show)
}

  componentDidMount() {
    const fetchData = (url) => {
      return fetch(url)
        .then(data => data.json())
        .then(json => {
          if (json) {
            return Promise.resolve(json);
          } else {
            return Promise.reject(Error('json is undefined!'));
          }
        })
    }
    const base = 'https://api.instagram.com/v1/users/self';
    const token = '1436480507.1e3451b.b1b86d9c1d754283ad78cb4927cd25e1';
    
    fetchData(`${base}?access_token=${token}`)
      .then(data => this.setState({ 
        username: data.data.username,
        user_picture: data.data.profile_picture
      }))
      .catch(error => console.error(error))
  }

render() {
  return (
    <View style={styles.mainContainer}> 
    <View style={styles.container}>
    <Image source={{uri: this.state.user_picture}}
      style={{width: 90, height: 90, borderRadius: 60, borderColor: 'black', borderWidth: 1}}/> 
    <Text style={styles.text}> Hello, </Text>
    <Text style={styles.username}> {this.state.username} </Text>
    <TouchableOpacity onPress={this.showMenu} style={styles.addButton}>
    <Image source={require('../../images/add.png')} style={styles.img} />
    </TouchableOpacity>
    </View>
{this.state.show
  ? (
      <View>
          <AddImageContainer /> 
      </View>
  )
  :  <Gallery />
}
    </View>
  )
}
}

const styles = StyleSheet.create({
container: {
  // alignItems:'flex-start',
  backgroundColor: '#707070',
  padding: 5,
  borderBottomColor: 'white',
  borderBottomWidth: 1,
  width: '100%',
  height: 230,
  justifyContent: 'space-around',
  display: 'flex'
},
addButton: {
  marginLeft: 30,
  alignItems: 'flex-start'
},
mainContainer: {
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
},
img: {
  height: 30,
  width: 30
},
username: {
  fontWeight: 'bold',
  fontSize: 15
},
disable: {
  display: 'none'
},
text: {
  color: 'black',
}
})

