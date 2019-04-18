import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'

export default class Login extends React.Component {
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
                Actions.pop()
            })
            .catch( () => {
                this.setState({
                    errorMessage: "Error",
                    loading: false,
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
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
                <Button title="Login" onPress={this.handleLogin} />
                <Button
                    style={styles.button}
                    title="Don't have an account? Sign Up"
                    onPress={() => Actions.replace('signup')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
})