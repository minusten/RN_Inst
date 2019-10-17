import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground, 
  ScrollView
} from 'react-native';
import InstagramLogin from 'react-native-instagram-login'
import { createStackNavigator } from 'react-navigation-stack'
import User from './src/components/User/User.js'
import Gallery from './src/components/Gallery/ Gallery.js';
import {createAppContainer} from 'react-navigation';   
import GalleryContainer from './src/components/Gallery/GalleryContainer.js';


 class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
        token: '',
        
    }
  }
  render() {
     return (
        <View style = {styles.container}>
           <Text style = {styles.title}>Welcome!</Text>
          <View>
          <TouchableOpacity onPress={()=> this.instagramLogin.show()}>
          <Text style={styles.login}> login </Text>
          </TouchableOpacity>
            <InstagramLogin
              ref= {ref => this.instagramLogin= ref}
              clientId='1e3451b4a250427ba415ee214d5eab98'
              redirectUrl='http://localhost:8081'
              scopes={['basic']}
              onLoginSuccess={(token) => this.setState({ token })}
              onLoginFailure={(data) => console.log(data)}
            />
              <Text>{this.state.token ? this.props.navigation.navigate('Details') : ''}</Text>

            </View>
         </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'black',
     alignItems: 'center',
     justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  login: {
    color:'#1a0033',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 25,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    // fontWeight: 'bold',
    
  },
  detailButton: {
    color: 'grey',
    backgroundColor: 'white'
  }
 
})
class DetailsScreen extends Component {
  render() {
    return (
        <User />
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}
