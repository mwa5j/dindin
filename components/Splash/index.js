import React, {Component} from 'react'
import {StyleSheet, View, ImageBackground, TouchableHighlight, Text} from 'react-native'
import {Actions} from 'react-native-router-flux'

const splash_pic =  '../../static/DINDIN/Design/splashVariations/Splash3.png'

export default class Splash extends Component {
    constructor(props){
        super(props)
        this.state = {
            displayText: "Get Started"
        }
    }

    handlePress = () => {
        Actions.home()
    }
    
    render() {
        return (
            <ImageBackground source={require(splash_pic)} style={styles.imageBackground} activeOpacity={1}>
                <TouchableHighlight style={styles.buttonContainer} onPress={this.handlePress}>
                    <Text style={styles.button}>{this.state.displayText}</Text>
                </TouchableHighlight>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: 48,
        width: '100%',
    },  
    button: {
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#4286f4',
    },
})