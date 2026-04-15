import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer" 
import postReducer from "./reducer/postReducer"
/**
 * 
 * Steps for state management
 * Submit Action
 * Handel Action in it's Reducer
 * Register Here -> Reducer
 */

 

export const Store = configureStore({
    reducer :{
        auth : authReducer,
        posts : postReducer
    }
})