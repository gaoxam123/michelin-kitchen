import axios from "axios";

// TODO: Change API
const API = "https://dummyjson.com/users/";

const request = axios.create({
    baseURL: API,
});

export default request;
