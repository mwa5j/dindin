import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

const photo = '../../static/DINDIN/Sliced/profile.png'

export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            sendName: "Laura Brown",
            recName: "",
            date: "Sunday 18 April",
            time: "8:00 pm",
            location: null,
            status: "pending",
        }
    }

    onAccept = () => {
        // update status in firebase
    }

    onReject = () => {
        // delete item in firebase
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.cardText}>{this.state.sendName}</Text>
                    <Text style={styles.cardText}>{this.state.date} - {this.state.time}</Text>
                </View>
                <View style={styles.buttonCont}>
                    <Text style={styles.accept}>Accept</Text>
                    <Text style={styles.reject}>Decline</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        marginRight: 20,
        marginLeft: 20,
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
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    accept: {
        backgroundColor: 'green',
        color: 'white',
        width: '30%',
        textAlign: 'center',
    },
    reject: {
        backgroundColor: 'red',
        color: 'white',
        width: '30%',
        textAlign: 'center',
    }
})