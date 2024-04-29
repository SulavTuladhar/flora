import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/reducers';

export default function LoginComponent({ props }) {
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const dispatch = useDispatch();

    function loginfun(){
        dispatch(login({email, password}));
    }
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.header}>Welcome To Flora</Text>
            <Text style={styles.header}>Sign in to your account</Text>
            <View>
                <View style={styles.inputContainer}>
                    <Text>Email address</Text>
                    <TextInput onChangeText={(text) => setEmail(text)} style={styles.inputField}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Password</Text>
                    <TextInput onChangeText={(text) => setpassword(text)} style={styles.inputField}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => loginfun()}>
                    <Text style={{color: "#fff", fontWeight: 'bold'}}>Sign in</Text>
                </TouchableOpacity>
                <View>
                    <Text>Not a member yet ?</Text>
                    <Text>Sign up</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        width: '96%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    header: {
        textAlign: 'center'
    },
    inputContainer : {
        marginBottom: 14
    },
    inputField: {
    //   borderWidth: 1,
      borderRadius: 4,
    //   borderColor: '#A06CD5',
      backgroundColor: '#e0e2db'
    },
    loginBtn: {
        backgroundColor: '#A06CD5',
        // alignSelf: 'flex-start',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 4
    }
})
