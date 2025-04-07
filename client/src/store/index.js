import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import blogReducer from "./blog";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
});
