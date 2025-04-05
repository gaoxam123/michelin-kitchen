import axios from "axios";
import API from "./api";

// Spring app API
// const API = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: API,
});

export default request;
