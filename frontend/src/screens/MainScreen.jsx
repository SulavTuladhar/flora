/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import MainScreenComponent from '../components/MainScreenComponent/MainScreenComponent';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/reducers';

const MainScreen = props => {

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
            <MainScreenComponent props={props}/>
        </View>
    );
};

export default MainScreen;
