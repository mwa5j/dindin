import React from 'react'
import {StyleSheet, View, Text, TouchableHighlight, Dimensions} from 'react-native'
import MapView from 'react-native-maps'
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

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
            hostName: ""
        }
    }

    componentWillMount(){
        firebase.database().ref('users').once('value', snapshot => {
            const usersObject = snapshot.val()
            if(usersObject){
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                }))

                for(var i = 0; i < usersList.length; i++){
                    if(this.props.user == usersList[i].key){
                        this.setState({
                            hostName: usersList[i].name
                        })
                    }

                }

            }
        })
    }

    updateMap = () => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.props.address + '&key=AIzaSyD-WGg4J1swtNCC1688tz3CBfDlGedWuPQ')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                    markerOP: 1.0
                })
            })
    }

    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.textCont}>
                    <Text style={styles.cardText}>{this.props.address}</Text>
                    <Text style={styles.cardText}>
                        {this.props.day} {this.props.date} {this.props.month} - {this.props.hour}:{this.props.minute < 10 ? 0 : ''}{this.props.minute} {this.props.ampm ? "pm" : "am"}
                    </Text>
                    <Text style={styles.cardText}>Hosted by: {this.state.hostName}</Text>
                </View> 
                {(this.props.status == "pending" && this.props.userID != this.props.user) && 
                    <View style={styles.buttonCont}>
                        <TouchableHighlight style={styles.acceptContainer} onPress={() => {
                            firebase.database().ref('dinners/' + this.props.uniqueID).update({
                                status: 'accept'
                            })
                            Actions.pop()
                        }}>
                            <Text style={styles.accept}>Accept</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.rejectContainer} onPress={() => {
                            firebase.database().ref('dinners/' + this.props.uniqueID).update({
                                status: 'reject'
                            })
                            Actions.pop()
                        }}>
                            <Text style={styles.reject}>Reject</Text>
                        </TouchableHighlight>
                    </View>
                }       
                {this.props.userID != this.props.user &&       
                    <MapView
                        style={styles.map}
                        region={{ // initial region set to Bileto
                            latitude: this.props.lat,
                            longitude: this.props.lng,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.lat,
                                longitude: this.props.lng,
                            }}
                            title={this.state.address}
                            opacity={this.state.markerOp}
                        />
                    </MapView>
                }
                <TouchableHighlight style={styles.buttonContainer} onPress={this.handlePress}>
                    <Text style={styles.button}>Cancel Dinner</Text>
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
    cardText: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
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
    textCont: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 300,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        marginTop: 10,
        marginBottom: 10,
    },
    acceptContainer: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10
    },
    rejectContainer: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10
    },
    accept: {
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
    },
    reject: {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
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
        flex: 1,
        height: '60%',
        ...StyleSheet.absoluteFillObject,
        top: 'auto',
    }
})

