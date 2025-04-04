import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import blogReducer from "./blog";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    blog: blogReducer,
  },
});

export const persistor = persistStore(store);
