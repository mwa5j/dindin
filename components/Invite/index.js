import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class Invite extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <Text>{this.props.hour} {this.props.minute} {this.props.ampm ? "pm" : "am"} {this.props.day} {this.props.date} {this.props.month} {this.props.address}</Text>

        )
    }
}