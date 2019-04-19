import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'

const eventButtonPic = '../../static/DINDIN/Sliced/addNewEvent.png'

export default class DateEntry extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: []
        }
    }

    render(){
        const eventButton = 
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                Actions.createevent({day: this.props.day, date: this.props.date, month: this.props.month})
            }}>
                <Image source={require(eventButtonPic)}/>
            </TouchableOpacity>

        // const dinnerList = 
        //     <FlatList
        //         data={this.state.dinners}
        //         renderItem={({item}) =>
        //             <Text>{item.status}</Text>
        //         }
        //     />

        return(
            <View>
                {/* {this.state.dinners && this.state.dinners.length > 0
                    ? dinnerList
                    : eventButton
                } */}
                <Text style={styles.titleText}>{this.props.day} {this.props.date} {this.props.month }</Text>
                {eventButton}
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
        marginTop: 10,
        width: '100%',
        alignItems: 'center'
    }
})