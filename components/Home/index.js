import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import firebase from 'firebase'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'

import Card from '../Card'
import DateEntry from '../DateEntry'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

// current date
const today = new Date()
const year = today.getYear() + 1900
const month = today.getMonth()
const date = today.getDate()

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: [],
            pending: [],
            daysLeft: [],
            year: year,
            month: month,
            date: date,
            userID: null
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
                    if(firebase.auth().currentUser.displayName == usersList[i].name){
                        console.log(usersList[i].name)
                        this.setState({
                            userID: usersList[i].key
                        })
                    }
                }

            }
        })
    }

    componentDidMount(){

        // load pending cards from firebase
        firebase.database().ref('dinners').on('value', snapshot => {
            const dinnersObject = snapshot.val()
            const parsedDinners = []

            if(dinnersObject){
                const dinnersList = Object.keys(dinnersObject).map(key => ({
                    ...dinnersObject[key],
                    key: key,
                }))

                for(var i = 0; i < dinnersList.length; i++){
                    if(dinnersList[i].indUid == this.state.userID){
                        if(dinnersList[i].status == "pending"){
                            parsedDinners.push(dinnersList[i])
                        }
                    }
                }
            }
            this.setState({dinners: parsedDinners})

        })
    }

    componentWillUnmount(){
        firebase.database().ref('dinners').off()
    }

    _renderPending = (item) => {
        return(
            <View>
                <Card 
                    user={item.user}
                    uniqueID={item.key}
                    sender={item.user}
                    day={item.day}
                    date={item.date}
                    month={item.month}
                    hour={item.hour}
                    minute={item.minute}
                    ampm={item.ampm}
                    address={item.address}
                    status={item.status}
                    lat={item.lat}
                    lng={item.lng}
                />
            </View>
        )
    }

    _renderDateEntry = (item) => {
        return(
            <View>
                <DateEntry day={days[item.day]} date={item.date} month={months[this.state.month]} userID={this.state.userID}/>
            </View>
        )
    }

    _pendingEmptyComponent = () => {
        return(
            <View>
                <Text>No pending at this time </Text>
            </View>
        )
    }

    onSwipeRight = () => {
        var prevMonth = this.state.month - 1
        if(prevMonth == -1){
            prevMonth = 11
        }
        this.setState({
            month: prevMonth,
            date: 1,
        })
        this.forceUpdate()

    }

    onSwipeLeft = () => {
        var nextMonth = this.state.month + 1
        if(nextMonth == 12){
            nextMonth = 0
        }
        this.setState({
            month: nextMonth,
            date: 1
        })
        this.forceUpdate()
    }

    render() {
        const daysLeft = []

        var stringKey = "a"

        // load today into variable
        var today = new Date(this.state.year, this.state.month, this.state.date)
        // get tomorrow's date
        var tomorrow = new Date(this.state.year, this.state.month, this.state.date + 1)

        // add today to the list
        daysLeft.push({
            date: today.getDate(),
            day: today.getDay(),
        })
        
        // iterate through month to add rest of days
        while(tomorrow.getMonth() == today.getMonth()){
            var tempDay = {
                date: tomorrow.getDate(),
                day: tomorrow.getDay(),
            }
            daysLeft.push(tempDay)
            tomorrow.setDate(tomorrow.getDate()+1)
        }

        // set state for list and current month
        return (
                <View style={styles.container}>
                    <GestureRecognizer
                        onSwipeLeft={this.onSwipeLeft}
                        onSwipeRight={this.onSwipeRight}
                    >
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{months[this.state.month]}</Text>
                        </View>
                    </GestureRecognizer>
                    <View style={styles.listContainer}>
                        <Text style={styles.titleText}>Pending ({this.state.dinners.length})</Text>
                        {this.state.dinners && this.state.dinners.length > 0 &&
                            <FlatList
                                data={this.state.dinners}
                                renderItem={({item}) => this._renderPending(item)}
                                horizontal={true}
                                keyExtractor={item => item.uniqueID}
                            />
                        }
                        {this.state.dinners.length == 0 &&
                            <Text style={styles.centerText}>No pending invitations</Text>
                        }
                    </View>
                    <View style={styles.dateEntryContainer}>
                        {/* <Text style={styles.titleText}>Invitations</Text> */}
                        <FlatList
                            data={daysLeft}
                            renderItem={({item}) => this._renderDateEntry(item)}
                            keyExtractor={item => item.date.toString()}
                        />  
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        alignSelf: 'center',
        marginTop: 5
    },
    titleText: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 0,
    },
    centerText: {
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 70
    },
    headerContainer: {
        width: '100%'
    },
    listContainer: {
        height: '30%',
        marginBottom: 0
    },
    dateEntryContainer: {
        height: '60%',
        marginBottom: 0,
    },
    container: {
        flex: 1,
        height: '100%'
    }
})