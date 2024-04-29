import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MainScreenComponent from '../components/MainScreenComponent/MainScreenComponent';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/reducers';
import LoginComponent from '../components/LoginComponent/LoginComponent';

const LoginScreen = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        loginow();
    }, []);
    async function loginow() {
        try {
        } catch (err) {
            console.log('error is >> ', err);
        }
    }
    // async function saveUserDetail() {
    //     const newData = {
    //         'name': name,
    //         'phone': phone
    //     }
    //     storage.set('userDetail', JSON.stringify(newData));
    //     setRefresh(!refresh);
    // }
    // : userDetails == undefined || userDetails == null
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <LoginComponent props={props}/>
        </View>
    );
};

export default LoginScreen;
