import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'

import Card from '../Card'

const eventButtonPic = '../../static/DINDIN/Sliced/addNewEvent.png'

export default class DateEntry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: [],
            currentMonth: this.props.month
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.month != this.props.month){
            firebase.database().ref('dinners').on('value', snapshot => {
                const dinnersObject = snapshot.val()
                const parsedDinners = []
    
                if(dinnersObject){
                    const dinnersList = Object.keys(dinnersObject).map(key => ({
                        ...dinnersObject[key],
                        key: key,
                    }))
    
                    for(var i = 0; i < dinnersList.length; i++){
                        if(dinnersList[i].status == "accept" && 
                        dinnersList[i].date == nextProps.date &&
                        dinnersList[i].month == nextProps.month){
                            console.log(dinnersList[i].month, this.props.month)
                            parsedDinners.push(dinnersList[i])
                        }
                    }
    
                    this.setState({dinners: parsedDinners})
                }
            })
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
                    if(dinnersList[i].status == "accept" && 
                    dinnersList[i].date == this.props.date &&
                    dinnersList[i].month == this.props.month){
                        console.log(dinnersList[i].month, this.props.month)
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
                    address={item.address}
                    ampm={item.ampm}
                    date={item.date}
                    day={item.day}
                    hour={item.hour}
                    indUid={item.indUid}
                    minute={item.minute}
                    month={item.month}
                    status={item.status}
                    uniqueID={item.key}
                    sender={item.user}
                />
            </View>
        )
    }


    render(){
        const eventButton = 
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                Actions.createevent({day: this.props.day, date: this.props.date, month: this.props.month})
            }}>
                <Image source={require(eventButtonPic)}/>
            </TouchableOpacity>

        const dinnerList = 
            <FlatList
                data={this.state.dinners}
                renderItem={({item}) => this._renderItem(item)}
                horizontal={true}
                keyExtractor={(item) => item.uniqueID}
                ListFooterComponent={eventButton}
            />

        return(
            <View>
                <Text style={styles.titleText}>{this.props.day} {this.props.date} {this.props.month }</Text>
                {this.state.dinners && this.state.dinners.length > 0
                    ? dinnerList
                    : eventButton
                }
            </View>
        )
    }
}

styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 24,
        width: '100%',
        alignItems: 'center'
    }
})