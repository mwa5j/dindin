import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableHighlight, Dimensions} from 'react-native'
import SwipeTimePicker from 'react-native-swipetimepicker'
import {Actions} from 'react-native-router-flux'
import MapView from 'react-native-maps'

const time = new Date()
const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
const minutes = time.getMinutes()
const ampm = time.getHours() > 12 ? true : false

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class createEvent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hour: hours,
            minute: minutes,
            ampm: ampm,
            address: "",
            lat: 0,
            lng: 0,
            markerOP: 0.0,
        }
    }

    updateMap = () => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyD-WGg4J1swtNCC1688tz3CBfDlGedWuPQ')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                    markerOP: 1.0
                })
            })
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
                    autoCapitalize="words"
                    placeholder="Choose an address"
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                    onSubmitEditing={this.updateMap}
                />
                <MapView
                    style={styles.map}
                    region={{ // initial region set to Bileto
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.lat,
                            longitude: this.state.lng,
                        }}
                        title={this.state.address}
                        opacity={this.state.markerOp}
                    />
                </MapView>
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
    map: {
        marginTop: 240,
        flex: 1,
        height: '50%',
        ...StyleSheet.absoluteFillObject,
        bottom: 20,
    }
})