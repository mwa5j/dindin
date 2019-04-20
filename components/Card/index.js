import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native'
import firebase from 'firebase'

const photo = '../../static/DINDIN/Sliced/profile.png'

export default class Card extends Component {
    constructor(props){
        super(props)
    }

    render(){

        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.cardText}>{this.props.address} {this.props.uniqueID}</Text>
                    <Text style={styles.cardText}>
                        {this.props.day} {this.props.date} {this.props.month} - {this.props.hour}:{this.props.minute < 10 ? 0 : ''}{this.props.minute} {this.props.ampm ? "pm" : "am"}
                    </Text>
                </View>
                <View style={styles.buttonCont}>
                    <TouchableHighlight style={styles.acceptContainer} onPress={() => {
                        console.log(this.props.uniqueID)
                        firebase.database().ref('dinners/' + this.props.uniqueID).update({
                            status: 'accept'
                        })
                    }}>
                        <Text style={styles.accept}>Accept</Text>
                    </TouchableHighlight>
                    <Text style={styles.reject}>Decline</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        marginRight: 10,
        marginLeft: 10,
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
    acceptContainer: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'green',
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
        width: '30%',
        textAlign: 'center',
    }
})