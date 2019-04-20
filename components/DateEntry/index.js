import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'

import Card from '../Card'

const eventButtonPic = '../../static/DINDIN/Sliced/addNewEvent.png'

export default class DateEntry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: []
        }
    }

    _renderItem = (item) => {
        return(
            <View>
                <Card 
                    key={item.key}
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


    render(){
        const eventButton = 
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                Actions.createevent({day: this.props.day, date: this.props.date, month: this.props.month})
            }}>
                <Image source={require(eventButtonPic)}/>
            </TouchableOpacity>

        const dinnerList = 
            <FlatList
                data={this.props.dinners}
                renderItem={({item}) => this._renderItem(item)}
                horizontal={true}
                ListFooterComponent={eventButton}
            />

        return(
            <View>
                <Text style={styles.titleText}>{this.props.day} {this.props.date} {this.props.month }</Text>
                {this.props.dinners && this.props.dinners.length > 0
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
        marginTop: 28,
        width: '100%',
        alignItems: 'center'
    }
})