import React, {Component} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

const photo = '../../static/DINDIN/Sliced/profile.png'

/*
Pass in:
- Key
- Sender
- Day
- Date
- Month
- Hour
- Minute
- ampm
- address
- UID
*/

export default class Card extends Component {
    constructor(props){
        super(props)
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
                    <Text style={styles.cardText}>{this.props.sender}</Text>
                    <Text style={styles.cardText}>
                        {this.props.day} {this.props.date} {this.props.month} - 
                        {this.props.hour}:{this.props.minute < 10 ? 0 : ''}{this.props.minute} 
                        {this.props.ampm ? "pm" : "am"}
                    </Text>
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