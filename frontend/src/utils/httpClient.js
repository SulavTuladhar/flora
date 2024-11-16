/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import axios from 'axios';

// const cookies = new Cookies();
const BASE_URL = 'http://192.168.1.107:9191/';
const http = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    timeoutErrorMessage: 'Takes too long for response'
});

const getHeaders = (secured, multipart = false) => {
    var options;
    if (multipart) {
        options = {
            'Content-Type': 'multipart/form-data'
        }
    } else {
        options = {
            'Content-Type': 'application/json'
        }
    }
    // if(secured){
    //     options['Authorization'] = cookies.get('token');
    // }
    return options;
}

const GET = (url, isSecure = false, params = {}) => {
   
    return http.get(url, {
        headers: getHeaders(isSecure),
        params
    })
};

const POST = (url, data, isSecure = false, multipart = false, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecure, multipart),
        params
    })
};

const PUT = (url, data, isSecure = false, multipart = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecure, multipart),
        params
    })
};

const DELETE = (url, isSecure = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecure),
        params
    })
};


export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
}