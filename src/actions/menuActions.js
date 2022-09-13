import axios from '../axios.js';

import {
    MENU_LIST_REQUEST,
    MENU_LIST_SUCCESS,
    MENU_LIST_FAIL,
    MENU_LIST_ID_REQUEST,
    MENU_LIST_ID_SUCCESS,
    MENU_LIST_ID_FAIL,
    MENU_DELETE_REQUEST,
    MENU_DELETE_SUCCESS,
    MENU_DELETE_FAIL,
    MENU_CREATE_REQUEST,
    MENU_CREATE_SUCCESS,
    MENU_CREATE_FAIL,
    MENU_DETAILS_REQUEST,
    MENU_DETAILS_SUCCESS,
    MENU_DETAILS_FAIL,
    MENU_UPDATE_REQUEST,
    MENU_UPDATE_SUCCESS,
    MENU_UPDATE_FAIL
} from "../constants/menuConstants";

export const listMenu = (storeUniqueKey) => async (dispatch) => {
    try {
        dispatch({ type: MENU_LIST_REQUEST })
        const { data } = await axios.get(`/stores/${storeUniqueKey}/menus`);

        dispatch({
            type: MENU_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MENU_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMenuWithId = (storeId) => async (dispatch, getState) => {
    try {
        dispatch({ type: MENU_LIST_ID_REQUEST })
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            url: `/stores/${storeId}/all-menus`
        }

        const { data } = await axios(
            config
        );
        
        dispatch({
            type: MENU_LIST_ID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MENU_LIST_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deleteMenu = (storeId, menuId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.delete(
            `/stores/${storeId}/menus/${menuId}`,
            config
        )

        dispatch({
            type: MENU_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MENU_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createMenu = (storeId, menu) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            method: 'post',
            url: `/stores/${storeId}/menus`,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            data: {
                'title': menu.name,
                'encoded_photo': menu.image,
                'extension': menu.extension
            }
        }
        const { data } = await axios(
            config
        )

        dispatch({
            type: MENU_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MENU_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getMenuDetails = (storeId, menuId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_DETAILS_REQUEST
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
            url: `/stores/${storeId}/menus/${menuId}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: MENU_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MENU_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateMenuDetails = (storeId, menuId, menu) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            data: menu,
            url: `/stores/${storeId}/menus/${menuId}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: MENU_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MENU_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
