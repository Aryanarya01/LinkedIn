import { createSlice } from "@reduxjs/toolkit"
import { getAllPosts } from "../../action/PostAction"


const initialState = {
    posts :[],
    isError :false,
    postFetched : false,
    isLoading : false,
    loggedIn : false,
    message : "",
    Comments :[],
    postId : "",
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        reset :()=>initialState,
        resetPostId : (state)=>{
            state.postId = ""
        },
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllPosts.pending,(state)=>{
            state.isLoading = true
            state.message = "Fetching all the posts..."
        })
    }
})