import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Splash from './components/Splash'
import Home from './components/Home'
import Login from './components/Login'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
    }
  }
  
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene 
            key="splash" 
            component={Splash}
            title="Welcome"
            initial={!this.state.loggedIn}
          />
          <Scene
            key="home"
            component={Home}
            title="Home"
            initial={this.state.loggedIn}
          />
          <Scene
            key="login"
            component={Login}
            title="Login"
          />

        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
