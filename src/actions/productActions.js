import axios from '../axios.js';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_ALL_DETAIL_REQUEST,
    PRODUCT_ALL_DETAIL_FAIL,
    PRODUCT_ALL_DETAIL_SUCCESS,
} from "../constants/productConstants";

export const listProduct = (storeId, menuId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.get(`/stores/${storeId}/menus/${menuId}/items`, config);



        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listProductDetails = (menuId, productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(`/menus/${menuId}/items/${productId}`, config);

        console.log(data);

        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProduct = (storeId, menuId, productId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
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
            `/stores/${storeId}/menus/${menuId}/items/${productId}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createProduct = (storeId, menuId, product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            method: 'post',
            url: `/stores/${storeId}/menus/${menuId}/items`,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${userInfo.token_type} ${userInfo.access_token}`
            },
            data: {
                'title': product.name,
                'encoded_photo': product.image,
                'extension': product.extension,
                'description': product.description,
                'price': product.price
            }
        }
        const { data } = await axios(
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProductDetails = (storeId, menuId, productId, product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
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
            data: product,
            url: `/stores/${storeId}/menus/${menuId}/items/${productId}`
        }

        const { data } = await axios(
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listProductUsingStoreName = (storeUniqueKey) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ALL_DETAIL_REQUEST })
        const { data } = await axios.get(`/stores/${storeUniqueKey}/items`);

        dispatch({
            type: PRODUCT_ALL_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_ALL_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
