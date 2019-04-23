import React from 'react'
import {StyleSheet, View, Text, FlatList, TouchableHighlight} from 'react-native'
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

export default class Invite extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            invited: [],
        }
        this.handleSubmit.bind(this)
    }

    componentDidMount(){
        firebase.database().ref('users').once('value', snapshot => {
            const usersObject = snapshot.val()
            if(usersObject){
                const usersList = Object.keys(usersObject).map(key => ({
                    ...usersObject[key],
                }))

                this.setState({users: usersList})
            }
        })
    }

    handleInvite = (key) => {
        var newUsers = [...this.state.users]
        var newInvited = [...this.state.invited]
        for(var i = 0; i < newUsers.length; i++){
            if(newUsers[i].key == key){
                newInvited.push(newUsers[i])
                newUsers.splice(i, 1)
            }
        }
        this.setState({
            users: newUsers,
            invited: newInvited
        })
    }

    handleRemove = (key) => {
        var newUsers = [...this.state.users]
        var newInvited = [...this.state.invited]
        for(var i = 0; i < newInvited.length; i++){
            if(newInvited[i].key == key){
                newUsers.unshift(newInvited[i])
                newInvited.splice(i, 1)
            }
        }
        this.setState({
            users: newUsers,
            invited: newInvited
        })
    }

    handleSubmit = () => {
        const user = firebase.auth().currentUser.uid
        const invited = [...this.state.invited]
        const invitedUids = []
        for(var i = 0; i < invited.length; i++){
            invitedUids.push(this.state.invited[i].key)
        }

        // push event to firebase
        const {day, date, month, hour, minute, ampm, address, lat, lng} = this.props
        const status = 'pending'

        console.log(invitedUids)

        for(var i = 0; i < invitedUids.length; i++){
            const indUid = invitedUids[i]

            const ref = firebase.database().ref('dinners').push({
                user,
                indUid,
                day,
                date,
                month,
                hour,
                minute,
                ampm,
                address,
                status,
                lat,
                lng
            })
            const key = ref.key
            
            firebase.database().ref('dinners/' + key).update({
                uniqueID: key,
            })

        }

        Actions.replace('home')

    }

    _renderInvited = (item) => {

        const selected = this.state.invited.includes(item.uid) ? true : false
        return(
            <View>
                {item.name != firebase.auth().currentUser.displayName && (
                <View style={styles.inviteContainer}>
                    <View>
                        <Text style={styles.headerText}>{item.name}</Text>
                        <Text>{item.number}</Text>
                    </View>
                    <TouchableHighlight style={selected ? styles.invitedButton : styles.inviteButton} onPress={() => this.handleRemove(item.key)} underlayColor={'#63c9f4'}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableHighlight>

                </View>
                )}
            </View>   
        )
    }

    _renderUsers = (item) => {

        const selected = this.state.invited.includes(item.uid) ? true : false
        return(
            <View>
                {item.name != firebase.auth().currentUser.displayName && (
                <View style={styles.inviteContainer}>
                    <View>
                        <Text style={styles.headerText}>{item.name}</Text>
                        <Text>{item.number}</Text>
                    </View>
                    <TouchableHighlight style={selected ? styles.invitedButton : styles.inviteButton} onPress={() => this.handleInvite(item.key)} underlayColor={'#63c9f4'}>
                        <Text style={styles.buttonText}>Invite</Text>
                    </TouchableHighlight>

                </View>
                )}
            </View>   
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text>{this.props.address}</Text>
                    <Text>{this.props.day} {this.props.date} {this.props.month} - {this.props.hour}:{this.props.minute} {this.props.ampm ? "pm" : "am"}</Text>
                </View>
                <View>
                    <Text style={styles.headerText}>Invited</Text>
                    {this.state.invited && this.state.invited.length > 0 && (
                        <FlatList
                            data={this.state.invited}
                            renderItem={({item}) => this._renderInvited(item)}
                        />
                    )}
                </View>
                <View>
                     <Text style={styles.headerText}>Users</Text>
                    {this.state.users && this.state.users.length > 1 && (
                        <FlatList
                            data={this.state.users}
                            renderItem={({item}) => this._renderUsers(item)}
                        />
                    )}
                </View>

                
                <TouchableHighlight style={styles.submitButtonContainer} onPress={this.handleSubmit} underlayColor={'#63c9f4'}>
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },  
    headerText: {
        fontSize: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    submitButton: {
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#4286f4',
    },
    submitButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: 48,
        width: '100%',
    },
    inviteContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 10,
    },
    inviteButton: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
        padding: 10,
        backgroundColor: '#4286f4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    invitedButton: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
        padding: 10,
        backgroundColor: '#50f215',
        justifyContent: 'center',
        alignItems: 'center',
    }
})