import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_ALL_DETAIL_REQUEST,
    PRODUCT_ALL_DETAIL_FAIL,
    PRODUCT_ALL_DETAIL_SUCCESS,
    PRODUCT_ALL_DETAIL_RESET
} from "../constants/productConstants"

export const productListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducers = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: {} }

        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload, success: true }

        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_DETAIL_RESET:
            return { product: {} }

        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, productInfo: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }


        case PRODUCT_UPDATE_RESET:
            return {}

        default:
            return state
    }
}



export const productListWithStoreReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ALL_DETAIL_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_ALL_DETAIL_SUCCESS:
            return { loading: false, products: action.payload.items ,
                page: action.payload.page,
                pages:  Math.ceil(action.payload.total/8)}

        case PRODUCT_ALL_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_ALL_DETAIL_RESET:
            return { loading: false, products: []  }

        default:
            return state
    }
}