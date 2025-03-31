import axios from "axios";

// Spring app API
const API = "http://localhost:8080/api/users";

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: API,
});

export default request;
