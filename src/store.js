import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducers, productDetailsReducers, productDeleteReducer, productCreateReducer, productUpdateReducer, productListWithStoreReducers } from './reducers/productReducers';
import { menuListReducers, menuIdListReducers, menuDeleteReducer, menuCreateReducer, menuDetailsReducers, menuUpdateReducer } from './reducers/menuReducers';
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers } from './reducers/userReducers';
import { storeListMyReducer, storeDeleteReducer, storeCreateReducer, storeDetailsReducers, storeUpdateReducer, storeDetailsKeyReducers } from "./reducers/storeReducers";

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    storeListMy: storeListMyReducer,
    storeDelete: storeDeleteReducer,
    storeCreate: storeCreateReducer,
    storeDetails: storeDetailsReducers,
    storeDetailsKey: storeDetailsKeyReducers,
    storeUpdate: storeUpdateReducer,
    menuList: menuListReducers,
    menuIdList: menuIdListReducers,
    menuDelete: menuDeleteReducer,
    menuCreate: menuCreateReducer,
    menuDetails: menuDetailsReducers,
    menuUpdate: menuUpdateReducer,
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productListWithStore: productListWithStoreReducers
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

