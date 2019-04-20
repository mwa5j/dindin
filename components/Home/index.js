import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import firebase from 'firebase'

import Card from '../Card'
import DateEntry from '../DateEntry'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

const d = new Date()
const dayIndex = d.getDay()
const date = d.getDate()
const monthIndex = d.getMonth()

const eventButtonPic = '../../static/DINDIN/Sliced/addNewEvent.png'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: [],
            pending: [],
        }
    }

    componentDidMount(){
        firebase.database().ref('dinners').on('value', snapshot => {
            const dinnersObject = snapshot.val()
            const parsedDinners = []

            if(dinnersObject){
                const dinnersList = Object.keys(dinnersObject).map(key => ({
                    ...dinnersObject[key],
                    key: key,
                }))

                for(var i = 0; i < dinnersList.length; i++){
                    if(dinnersList[i].status == "pending"){
                        parsedDinners.push(dinnersList[i])
                    }
                }

                this.setState({dinners: parsedDinners})
            }
        })
    }

    _renderItem = (item) => {
        return(
            <View>
                <Card 
                    uniqueID={item.key}
                    sender={item.user}
                    day={item.day}
                    date={item.date}
                    month={item.month}
                    hour={item.hour}
                    minute={item.minute}
                    ampm={item.ampm}
                    address={item.address}
                />
            </View>
        )
    }

    render() {
        return (
            <View>
                <View>
                    {/* <Text style={styles.headerText}>Welcome {firebase.auth().currentUser.displayName}</Text> */}
                </View>
                <View>
                    <Text style={styles.headerText}>Pending ({0})</Text>
                    {this.state.dinners && this.state.dinners.length > 0 &&
                        <FlatList
                            data={this.state.dinners}
                            renderItem={({item}) => this._renderItem(item)}
                            horizontal={true}
                        />
                    }
                </View>
                <View>
                    <DateEntry day={days[dayIndex]} date={date} month={months[monthIndex]} dinners={this.state.dinners}/>
                </View>
                <View>
                    <DateEntry day={days[dayIndex]} date={date + 1} month={months[monthIndex]} dinners={this.state.dinners}/>
                </View>
                {/* <View>
                    <DateEntry day={days[dayIndex]} date={date + 1} month={months[monthIndex]} dinners={[]}/>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
    },
    listContainer: {
        height: 150
    },
    container: {
        height: '100%'
    }
})