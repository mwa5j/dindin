import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native'
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

const photo = '../../static/DINDIN/Sliced/profile.png'

export default class Card extends Component {
    constructor(props){
        super(props)
    }

    handlePress = () => {
        console.log("Hey!")
        Actions.push('createevent')
    }

    render(){

        return(
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {
                    Actions.eventdetail({
                        user: this.props.user,
                        day: this.props.day,
                        date: this.props.date,
                        month: this.props.month,
                        hour: this.props.hour,
                        minute: this.props.minute,
                        ampm: this.props.ampm,
                        address: this.props.address,
                        status: this.props.status,
                        uniqueID: this.props.uniqueID,
                    })
                }}>
                    <View style={styles.textCont}>
                        <Text style={styles.cardText}>{this.props.address}</Text>
                        <Text style={styles.cardText}>
                            {this.props.day} {this.props.date} {this.props.month} - {this.props.hour}:{this.props.minute < 10 ? 0 : ''}{this.props.minute} {this.props.ampm ? "pm" : "am"}
                        </Text>
                    </View>
                </TouchableHighlight>
                {this.props.status == "pending" && 
                    <View style={styles.buttonCont}>
                        <TouchableHighlight style={styles.acceptContainer} onPress={() => {
                            console.log(this.props.uniqueID)
                            firebase.database().ref('dinners/' + this.props.uniqueID).update({
                                status: 'accept'
                            })
                        }}>
                            <Text style={styles.accept}>Accept</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.rejectContainer} onPress={() => {
                            console.log(this.props.uniqueID)
                            firebase.database().ref('dinners/' + this.props.uniqueID).update({
                                status: 'reject'
                            })
                        }}>
                            <Text style={styles.reject}>Reject</Text>
                        </TouchableHighlight>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        padding: 10,
        width: 'auto',
        alignItems: 'stretch',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    cardText: {
        textAlign: 'center',
        marginTop: 10,
    },  
    buttonCont: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        marginTop: 10,
        marginBottom: 10,
    },
    textCont: {
        flexDirection: 'column',
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
    }
})