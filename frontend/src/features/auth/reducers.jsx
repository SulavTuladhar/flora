/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { httpClient } from '../../utils/httpClient';

const storage = new MMKV({ id: 'flora' });
export const checkLocalStorage = createAsyncThunk('checkLocalStorage', async (data, { rejectWithValue }) => {
    try {
        const user = storage.getString('userDetail');
        const token = storage.getString('token');
        return {
            user: user !== undefined
                ? JSON.parse(user)
                : user,
            token: token !== undefined
                ? JSON.parse(token)
                : token,
        }
        // setUserDetails(JSON.parse(user));
        // setUserDetails(null);
    } catch (err) {
        return rejectWithValue(err);
    }
})

export const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
    try {
        console.log('====================================');
        console.log("data is >> ", data);
        console.log('====================================');
        const res = await httpClient.POST('/auth/login',
            {
                email: data.email,
                password: data.password
            }
        );
        console.log('====================================');
        console.log('response is  >> ', res);
        console.log('====================================');
        return data;
    } catch (err) {
        console.log('====================================');
        console.log('error ayo >> ', err);
        console.log('====================================');
        return rejectWithValue(err);
    }
})