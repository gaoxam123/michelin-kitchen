import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import blogReducer from "./blog";

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});

export default store;
