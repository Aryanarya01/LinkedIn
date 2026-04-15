import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllPosts = createAsyncThunk("post/getAllPosts",async(_,thunkAPI)=>{
    try{

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data);
    }
})  