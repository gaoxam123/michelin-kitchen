import { createSlice } from "@reduxjs/toolkit";

// following contains username, profilePicture, id of users
const initialUserState = {
  id: null,
  isAuthenticated: false,
  username: null,
  image: null,
  following: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      state = {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    },
    logout(state) {
      state = {
        ...initialUserState,
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
