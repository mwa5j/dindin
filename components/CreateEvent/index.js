import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import SwipeTimePicker from 'react-native-swipetimepicker'

export default class createEvent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hour: 0,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.headerText}>What time is dinner?</Text>
                <SwipeTimePicker
                    backgroundColor={'#4286f4'}
                    time={new Date()}
                    onChange={(time) => {
                        this.setState({
                            hour: time.hour
                        })
                    }}
                />
                <Text>{this.state.hour} {this.props.day} {this.props.month}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },  
    headerText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
    }
})