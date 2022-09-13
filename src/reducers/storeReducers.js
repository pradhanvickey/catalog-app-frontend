import {
    STORE_LIST_MY_REQUEST,
    STORE_LIST_MY_SUCCESS,
    STORE_LIST_MY_FAIL,
    STORE_LIST_MY_RESET,
    STORE_DELETE_REQUEST,
    STORE_DELETE_SUCCESS,
    STORE_DELETE_FAIL,
    STORE_CREATE_REQUEST,
    STORE_CREATE_SUCCESS,
    STORE_CREATE_FAIL,
    STORE_CREATE_RESET,
    STORE_DETAILS_REQUEST,
    STORE_DETAILS_SUCCESS,
    STORE_DETAILS_FAIL,
    STORE_DETAILS_RESET,
    STORE_UPDATE_REQUEST,
    STORE_UPDATE_FAIL,
    STORE_UPDATE_SUCCESS,
    STORE_DELETE_RESET,
    STORE_UPDATE_RESET,
    STORE_DETAILS_KEY_REQUEST,
    STORE_DETAILS_KEY_SUCCESS,
    STORE_DETAILS_KEY_FAIL,
    STORE_DETAILS_KEY_RESET,
} from '../constants/storeConstants';


export const storeListMyReducer = (state = { stores: [] }, action) => {
    switch (action.type) {
        case STORE_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case STORE_LIST_MY_SUCCESS:
            return {
                loading: false,
                stores: action.payload
            }

        case STORE_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case STORE_LIST_MY_RESET:
            return {
                stores: []
            }

        default:
            return state
    }
}


export const storeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_DELETE_REQUEST:
            return { loading: true }

        case STORE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case STORE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case STORE_DELETE_RESET:
            return {}

        default:
            return state
    }
}


export const storeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_CREATE_REQUEST:
            return { loading: true }

        case STORE_CREATE_SUCCESS:
            return { loading: false, success: true }

        case STORE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case STORE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const storeDetailsKeyReducers = (state = { store: {} }, action) => {
    switch (action.type) {
        case STORE_DETAILS_KEY_REQUEST:
            return { ...state, loading: true }

        case STORE_DETAILS_KEY_SUCCESS:
            return { loading: false, store: action.payload, success: true }

        case STORE_DETAILS_KEY_FAIL:
            return { loading: false, error: action.payload }

        case STORE_DETAILS_KEY_RESET:
            return { store: {} }

        default:
            return state
    }
}


export const storeDetailsReducers = (state = { store: {} }, action) => {
    switch (action.type) {
        case STORE_DETAILS_REQUEST:
            return { ...state, loading: true }

        case STORE_DETAILS_SUCCESS:
            return { loading: false, store: action.payload }

        case STORE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case STORE_DETAILS_RESET:
            return { store: {} }

        default:
            return state
    }
}


export const storeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_UPDATE_REQUEST:
            return { loading: true }

        case STORE_UPDATE_SUCCESS:
            return { loading: false, success: true, shopInfo: action.payload }

        case STORE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case STORE_UPDATE_RESET:
            return {}

        default:
            return state
    }
}