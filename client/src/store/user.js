import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to add a follower
export const addFollower = createAsyncThunk(
  "user/addFollower",
  async ({ followerId, followedId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/addFollower`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId, followedId }),
      });
      if (!response.ok) throw new Error("Failed to follow user");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to remove a follower
export const removeFollower = createAsyncThunk(
  "user/removeFollower",
  async ({ followerId, followedId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/removeFollower`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId, followedId }),
      });
      if (!response.ok) throw new Error("Failed to unfollow user");
      return followedId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialUserState = {
  id: null,
  isAuthenticated: false,
  username: null,
  image: null,
  following: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      Object.assign(state, action.payload);
    },
    logout(state) {
      Object.assign(state, initialUserState);
    },
  },
  extraReducers: (builder) => {
    builder
      // Add follower
      .addCase(addFollower.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFollower.fulfilled, (state, action) => {
        state.following.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addFollower.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Remove follower
      .addCase(removeFollower.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (u) => u.id !== action.payload
        );
        state.status = "succeeded";
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
