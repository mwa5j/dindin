import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import firebase from 'firebase'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
const d = new Date()
const day_index = d.getDay()
const date = d.getDate()
const month_index = d.getMonth()




export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            numPending: 0,
            pending: []
        }
    }
    
    nextDay = (day_index) => {

    }

    nextDate = (date) => {

    }

    nextMonth = (month_index) => {

    }

    render() {
        return (
            <View>
                <View>
                    <Text>Welcome {firebase.auth().currentUser.displayName}</Text>
                </View>
                <View>
                    <Text>Pending ({this.state.numPending})</Text>
                </View>
                <View>
                    <Text>{days[day_index]} {date} {months[month_index]}</Text>
                </View>
                <View>
                    <Text>{days[day_index + 1]} {date + 1} {months[month_index]}</Text>
                </View>
                <View>
                    <Text>{days[day_index + 2]} {date + 2} {months[month_index]}</Text>
                </View>
            </View>
        )
    }
}