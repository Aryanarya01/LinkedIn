import axios from "axios";


export const BASE_URL = "https://linkedin-e3hx.onrender.com/";
export const clientServer = axios.create({
    baseURL : BASE_URL
})