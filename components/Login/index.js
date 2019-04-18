import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            loading: false,
        }
    }

    handleLogin = () => {
        this.setState({
            errorMessage: "",
            loading: true,
        })

        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( () => {
                this.setState({
                    errorMessage: "",
                    loading: false,
                })
                Actions.reset('home')
            })
            .catch( () => {
                this.setState({
                    errorMessage: "Incorrect Username or Password",
                    loading: false,
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Login</Text>
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
                    onPress={this.handleLogin}
                >
                    <Text style={styles.submitText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => Actions.replace("signup")}
                >
                    <Text style={styles.submitText}>Don't have an account? Sign Up</Text>
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
        paddingBottom: 100,
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