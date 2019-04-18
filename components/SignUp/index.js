import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'

const splash_pic =  '../../static/DINDIN/Design/splashVariations/Splash.png'

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            errorMessage: "",
            loading: false,
        }
    }

    handleSignUp = () => {
        this.setState({
            errorMessage: "",
            loading: true,
        })

        const {name, email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: name,
                    photoURL: '../../static/DINDIN/Design/Sliced/profile.png'
                })
                .then(() => {
                    this.setState({
                        errorMessage: "",
                        loading: false,
                    })
                    Actions.reset('home')
                })
            })
            .catch( () => {
                this.setState({
                    errorMessage: "Sign Up failed, invalid Username or Password",
                    loading: false,
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Sign Up</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="First and Last name"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                 />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                 />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleSignUp}
                >
                    <Text style={styles.submitText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => Actions.replace("login")}
                >
                    <Text style={styles.submitText}>Already have an account? Log in</Text>
                </TouchableOpacity>
                <Text style={styles.errorText}>
                    {this.state.errorMessage != '' ? this.state.errorMessage : ""}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 40,
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },
    submitButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#4286f4',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    headerText: {
        fontSize: 25,
    },
    errorText: {
        marginTop: 10,
        color: 'red',
        fontWeight: 'bold',
    }
})