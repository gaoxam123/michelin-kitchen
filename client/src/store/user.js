import apiRoutes from "../config/apiRoutes";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";

export const addFollowed = createAsyncThunk(
  "user/addFollowed",
  async ({ followerId, followedId }, { rejectWithValue }) => {
    try {
      const response = await request.post(apiRoutes.follows, {
        followerId,
        followedId,
      });
      return response.data.followedId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to follow user"
      );
    }
  }
);

export const removeFollowed = createAsyncThunk(
  "user/removeFollowed",
  async ({ followerId, followedId }, { rejectWithValue }) => {
    try {
      const response = await request.delete(apiRoutes.follows, {
        followerId,
        followedId,
      });
      return response.data.followedId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unfollow user"
      );
    }
  }
);

// TODO: apiRoutes
export const getFollowed = createAsyncThunk(
  "user/getFollowed",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await request.get(`/users/${userId}/followed`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get followed users"
      );
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (req, { rejectWithValue }) => {
    try {
      const response = await request.post(apiRoutes.auth.register, req);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Can't register account"
      );
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await request.post(apiRoutes.auth.authenticate, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Can't log in right now :("
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await request.post(apiRoutes.auth.logout, {
        username,
        password,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to log out"
      );
    }
  }
);

const initialUserState = {
  user: null,
  following: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFollowed.fulfilled, (state, action) => {
        state.following.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(removeFollowed.fulfilled, (state, action) => {
        state.following = state.following.filter((id) => id !== action.payload);
        state.status = "succeeded";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logout.fulfilled, (state) => {
        state = { ...initialUserState };
        state.status = "succeeded";
        console.log(state.user);
      })
      .addCase(getFollowed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.following = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
