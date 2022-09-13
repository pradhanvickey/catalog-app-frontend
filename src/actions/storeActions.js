import axios from '../axios.js';
import {
    STORE_LIST_MY_REQUEST,
    STORE_LIST_MY_SUCCESS,
    STORE_LIST_MY_FAIL,
    STORE_DELETE_REQUEST,
    STORE_DELETE_SUCCESS,
    STORE_DELETE_FAIL,
    STORE_CREATE_REQUEST,
    STORE_CREATE_SUCCESS,
    STORE_CREATE_FAIL,
    STORE_DETAILS_REQUEST,
    STORE_DETAILS_SUCCESS,
    STORE_DETAILS_FAIL,
    STORE_UPDATE_REQUEST,
    STORE_UPDATE_FAIL,
    STORE_UPDATE_SUCCESS,
    STORE_DETAILS_KEY_REQUEST,
    STORE_DETAILS_KEY_SUCCESS

} from '../constants/storeConstants';


export const listMyStores = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'accept': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.get(
            `/stores`,
            config
        )

        dispatch({
            type: STORE_LIST_MY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STORE_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteStore = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_DELETE_REQUEST
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
            `/stores/${id}`,
            config
        )

        dispatch({
            type: STORE_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STORE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createStore = (store) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            method: 'post',
            url: '/stores',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            data: {
                'name': store.name,
                'contact_no': store.phone,
                'address': store.address,
                'encoded_photo': store.image,
                'extension': store.extension
            }
        }

        const { data } = await axios(
            config
        )

        dispatch({
            type: STORE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STORE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getStoreDetails = (storeId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_DETAILS_REQUEST
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
            url: `/stores/${storeId}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: STORE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getStoreDetailsUsingKey = (storeUniqueKey) => async (dispatch) => {
    try {
        dispatch({
            type: STORE_DETAILS_KEY_REQUEST
        })

        const config = {
            method: 'get',
            headers: {
                'accept': 'application/json'
            },
            url: `/stores/?unique_store_key=${storeUniqueKey}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: STORE_DETAILS_KEY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STORE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateStoreDetails = (storeId, store) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STORE_UPDATE_REQUEST
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
            data: store,
            url: `/stores/${storeId}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: STORE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: STORE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

