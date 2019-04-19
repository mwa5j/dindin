import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import firebase from 'firebase'

import Card from '../Card'
import DateEntry from '../DateEntry'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

const d = new Date()
const dayIndex = d.getDay()
const date = d.getDate()
const monthIndex = d.getMonth()


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            numPending: 0,
            dinners: []
        }
    }

    componentDidMount(){
        firebase.database().ref('dinners').once('value', snapshot => {
            const dinnersObject = snapshot.val()

            if(dinnersObject){
                const dinnersList = Object.keys(dinnersObject).map(key => ({
                    ...dinnersObject[key],
                    uid: key,
                }))
                
                this.setState({dinners: dinnersList})
            }
        })
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.headerText}>Welcome {firebase.auth().currentUser.displayName}</Text>
                </View>
                <View>
                    <Text style={styles.headerText}>Pending ({this.state.numPending})</Text>
                </View>
                <DateEntry day={days[dayIndex]} date={date} month={months[monthIndex]}/>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
    }
})