import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

import {PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET, PRODUCT_ALL_DETAIL_RESET, PRODUCT_DELETE_RESET} from "../constants/productConstants";
import {MENU_DELETE_RESET, MENU_DETAILS_RESET, MENU_LIST_RESET, MENU_UPDATE_REQUEST} from '../constants/menuConstants';


import axios from '../axios.js';
const qs = require('qs');

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            method: 'post',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'grant_type': '',
                'username': email,
                'password': password,
                'scope': '',
                'client_id': '',
                'client_secret': ''
            }),
            url: '/users/login'
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_UPDATE_PROFILE_RESET})


    dispatch({ type: PRODUCT_UPDATE_RESET })
    dispatch({ type: PRODUCT_CREATE_RESET })
    dispatch({ type: PRODUCT_ALL_DETAIL_RESET })
    dispatch({ type: PRODUCT_DELETE_RESET })

    dispatch({ type: MENU_DELETE_RESET })
    dispatch({ type: MENU_DETAILS_RESET })
    dispatch({ type: MENU_LIST_RESET })
    dispatch({ type: MENU_UPDATE_REQUEST })
}


export const register = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            method: 'post',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json'
            },
            data: {
                'email': email,
                'password': password,
                'is_active': true
            },
            url: '/users'
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            url: '/user'
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            data: user,
            url: '/users'
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}