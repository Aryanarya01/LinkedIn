import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { loginUser, registerUser } from "../../action/AuthAction"


const initialState = {
    user : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    loggedIn : false,
    message : "",
    profileFetched : false,
    connections : [],
    connectionRequest : [],
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : ()=>initialState,
        handelLoginUser : (state)=>{
            state.message = "hello"
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true
            state.message = "Logging You!"
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.loggedIn = true;
            state.isSuccess = true;
            state.message = "Login is Successful";
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
            state.message = "Registering you...";
        })
        .addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Registered Successfull";
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message =  action.payload;
        })
    }
})

export default authSlice.reducer;