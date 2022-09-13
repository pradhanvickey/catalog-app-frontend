import {
    MENU_LIST_REQUEST,
    MENU_LIST_SUCCESS,
    MENU_LIST_FAIL,
    MENU_LIST_RESET,
    MENU_LIST_ID_REQUEST,
    MENU_LIST_ID_SUCCESS,
    MENU_LIST_ID_FAIL,
    MENU_LIST_ID_RESET,
    MENU_DELETE_REQUEST,
    MENU_DELETE_SUCCESS,
    MENU_DELETE_FAIL,
    MENU_CREATE_REQUEST,
    MENU_CREATE_SUCCESS,
    MENU_CREATE_FAIL,
    MENU_CREATE_RESET,
    MENU_DETAILS_REQUEST,
    MENU_DETAILS_SUCCESS,
    MENU_DETAILS_FAIL,
    MENU_UPDATE_REQUEST,
    MENU_UPDATE_SUCCESS,
    MENU_UPDATE_FAIL,
    MENU_UPDATE_RESET,
    MENU_DETAILS_RESET,
} from "../constants/menuConstants";

export const menuListReducers = (state = { menus: [] }, action) => {
    switch (action.type) {
        case MENU_LIST_REQUEST:
            return { loading: true, menus: [] }

        case MENU_LIST_SUCCESS:
            return { loading: false, menus: action.payload }

        case MENU_LIST_FAIL:
            return { loading: false, error: action.payload }

        case MENU_LIST_RESET:
            return { menus: [] }

        default:
            return state
    }
}


export const menuIdListReducers = (state = { menus: [] }, action) => {
    switch (action.type) {
        case MENU_LIST_ID_REQUEST:
            return { loading: true, menus: [] }

        case MENU_LIST_ID_SUCCESS:
            return { loading: false, menus: action.payload }

        case MENU_LIST_ID_FAIL:
            return { loading: false, error: action.payload }

        case MENU_LIST_ID_RESET:
            return { menus: [] }

        default:
            return state
    }
}


export const menuDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_DELETE_REQUEST:
            return { loading: true }

        case MENU_DELETE_SUCCESS:
            return { loading: false, success: true }

        case MENU_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const menuCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_CREATE_REQUEST:
            return { loading: true }

        case MENU_CREATE_SUCCESS:
            return { loading: false, success: true }

        case MENU_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case MENU_CREATE_RESET:
            return {}

        default:
            return state
    }
}



export const menuDetailsReducers = (state = { menu: {} }, action) => {
    switch (action.type) {
        case MENU_DETAILS_REQUEST:
            return { ...state, loading: true }

        case MENU_DETAILS_SUCCESS:
            return { loading: false, menu: action.payload }

        case MENU_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case MENU_DETAILS_RESET:
            return { menu: {} }

        default:
            return state
    }
}


export const menuUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MENU_UPDATE_REQUEST:
            return { loading: true }

        case MENU_UPDATE_SUCCESS:
            return { loading: false, success: true, menuInfo: action.payload }

        case MENU_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        
        
        case MENU_UPDATE_RESET:
            return {}

        default:
            return state
    }
}