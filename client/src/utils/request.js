import axios from "axios";
import API from "./api";
import routes from "../config/routes";
import { Http } from "@mui/icons-material";

// Spring app API
// const API = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: API,
});

// login whenever jwt is expired
// request.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = routes.login;
//     }
//     return Promise.reject(error);
//   }
// );

export default request;
