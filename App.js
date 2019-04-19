import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import firebase from 'firebase'

import Splash from './components/Splash'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateEvent from './components/CreateEvent'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: null,
    }
  }
  
  componentWillMount(){
    firebase.initializeApp({
        apiKey: "AIzaSyBUwE2KTyMWMyRQQg9QicifKejCUhzojls",
        authDomain: "dindin-4d31d.firebaseapp.com",
        databaseURL: "https://dindin-4d31d.firebaseio.com",
        projectId: "dindin-4d31d",
        storageBucket: "dindin-4d31d.appspot.com",
        messagingSenderId: "901896786005"
    })

    firebase.auth().signInWithEmailAndPassword("matt@mail.com", "password")
      .then(() => {
        Actions.home()
      })
      .catch(() =>{
        Actions.login()
      })
  }

  componentDidMount(){
    const curr_user = firebase.auth().currentUser
    this.setState({
      user: curr_user,
    })
  }

  render() {
    return (
      <Router>
        <Scene key="root" headerLayoutPreset="center">
          <Scene
            key="splash" 
            component={Splash}
            title="Welcome"
            initial={firebase.auth().currentUser == null}
          />
          <Scene
            key="home"
            component={Home}
            title="Home"
            initial={firebase.auth().currentUser != null}
          />
          <Scene
            key="login"
            component={Login}
            title="Login"
          />
          <Scene
            key='signup'
            component={SignUp}
            title="Sign Up"
          />
          <Scene
            key='createevent'
            component={CreateEvent}
            title="DinDin"
          />

        </Scene>
      </Router>
    );
  }
}