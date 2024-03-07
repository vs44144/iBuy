import { combineReducers, applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { 
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
 } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
   } from "./reducers/userReducers"

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
} from './reducers/orderReducers'
import{
  exampleListReducer,
  exampleDetailsReducer,
  exampleDeleteReducer,
  exampleCreateReducer,
  exampleUpdateReducer,
  exampleTopRatedReducer,
} from './reducers/exampleReducers'

import {
  shembullipareListReducer,
  shembullipareDetailsReducer,
  shembullipareDeleteReducer,
  shembullipareCreateReducer,
  shembullipareUpdateReducer
} from './reducers/shembullipareReducers'

import {
  shembullidyteListReducer,
  shembullidyteDetailsReducer,
  shembullidyteDeleteReducer,
  shembullidyteCreateReducer,
  shembullidyteUpdateReducer
} from './reducers/shembullidyteReducers'

import{
  planetListReducer,
  planetDetailsReducer,
  planetDeleteReducer,
  planetCreateReducer,
  planetUpdateReducer
} from './reducers/planetReducers'

import{
  satelliteListReducer,
  satelliteDetailsReducer,
  satelliteDeleteReducer,
  satelliteCreateReducer,
  satelliteUpdateReducer
} from './reducers/satelliteReducers'

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

    exampleList: exampleListReducer,
    exampleDetails: exampleDetailsReducer,
    exampleDelete: exampleDeleteReducer,
    exampleCreate: exampleCreateReducer,
    exampleUpdate: exampleUpdateReducer,
    exampleTopRated: exampleTopRatedReducer,

    shembullipareList: shembullipareListReducer,
    shembullipareDetails: shembullipareDetailsReducer,
    shembullipareDelete: shembullipareDeleteReducer,
    shembullipareCreate: shembullipareCreateReducer,
    shembullipareUpdate: shembullipareUpdateReducer,

    shembullidyteList: shembullidyteListReducer,
    shembullidyteDetails: shembullidyteDetailsReducer,
    shembullidyteDelete: shembullidyteDeleteReducer,
    shembullidyteCreate: shembullidyteCreateReducer,
    shembullidyteUpdate: shembullidyteUpdateReducer,

    planetList: planetListReducer,
    planetDetails: planetDetailsReducer,
    planetDelete: planetDeleteReducer,
    planetCreate: planetCreateReducer,
    planetUpdate: planetUpdateReducer,

    satelliteList: satelliteListReducer,
    satelliteDetails: satelliteDetailsReducer,
    satelliteDelete: satelliteDeleteReducer,
    satelliteCreate: satelliteCreateReducer,
    satelliteUpdate: satelliteUpdateReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart:{ cartItems: cartItemsFromStorage, 
    shippingAddress: shippingAddressFromStorage
  },
  userLogin:{ userInfo: userInfoFromStorage }

}

const middleware = [thunk]

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [...middleware],
  })

export default store