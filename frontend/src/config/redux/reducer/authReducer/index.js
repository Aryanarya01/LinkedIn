import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, getAllUsers, loginUser, registerUser } from "../../action/AuthAction"


const initialState = {
    user : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    loggedIn : false,
    message : "",
    isTokenThere : false,
    profileFetched : false,
    connections : [],
    connectionRequest : [],
    all_users : [],
    all_profiles_fetching : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : ()=>initialState,
        handelLoginUser : (state)=>{
            state.message = "hello"
        },
        emptyMessage : (state)=>{
            state.message = ""
        },
        setTokenIsThere : (state)=>{
            state.isTokenThere = true
        },
        setTokenIsNotThere : (state)=>{
            state.isTokenThere = false
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
            state.loggedIn = false;
            state.message = {
                message :"Registered Successfull, Please Login!"
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message =  action.payload;
        })
        .addCase(getAboutUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.profileFetched  = true;
            state.user = action.payload;
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.all_users = action.payload.profiles;
        })
    }
})
export const {reset,emptyMessage,setTokenIsThere,setTokenIsNotThere} = authSlice.actions;
export default authSlice.reducer;