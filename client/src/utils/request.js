import axios from "axios";

// Spring app API
const API = "http://localhost:8080/api/users";

const request = axios.create({
    baseURL: API,
});

export default request;
