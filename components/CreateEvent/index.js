import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableHighlight} from 'react-native'
import SwipeTimePicker from 'react-native-swipetimepicker'
import {Actions} from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const time = new Date()
const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
const minutes = time.getMinutes()
const ampm = time.getHours() > 12 ? false : true

export default class createEvent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hour: hours,
            minute: minutes,
            ampm: ampm,
            address: "",
        }
    }

    handlePress = () => {
        Actions.invite({
            day: this.props.day,
            date: this.props.date,
            month: this.props.month,
            hour: this.state.hour,
            minute: this.state.minute,
            ampm: this.state.ampm,
            address: this.state.address
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>What time is dinner?</Text>
                <SwipeTimePicker
                    backgroundColor={'#4286f4'}
                    time={new Date()}
                    onChange={(time) => {
                        console.log("Changing state")
                        this.setState({
                            hour: time.hour,
                            minute: time.minute,
                            ampm: time.ampm
                        })
                    }}
                />
                <Text style={styles.headerText}>Where is dinner?</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Choose an address"
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                />
                {/* <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{ // initial region set to Bileto
                            latitude: 50.0517273,
                            longitude: 14.4286503,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </View> */}
                <TouchableHighlight style={styles.buttonContainer} onPress={this.handlePress}>
                    <Text style={styles.button}>Invite People</Text>
                </TouchableHighlight>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },  
    headerText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },
    button: {
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#4286f4',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: 48,
        width: '100%',
    },  
})