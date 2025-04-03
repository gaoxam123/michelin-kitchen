import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";

// TODO: apiroutes
export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await request.get(`/blogs/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get blog with id " + blogId
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ blog }, { rejectWithValue }) => {
    try {
      const response = await request.put(`/blogs`, {
        data: blog,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update blog with id " + blog.id
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ blog }, { rejectWithValue }) => {
    try {
      const response = await request.delete(`/blogs`, {
        data: blog,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update blog with id " + blog.id
      );
    }
  }
);

export const fetchCommentsByBlogId = createAsyncThunk(
  "blog/fetchCommentsByBlogId",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await request.get(`/comments/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to get comments of blog with id " + blogId
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "blog/addComment",
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await request.post(`comments`, {
        data: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "blog/updateComment",
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await request.put(`comments`, {
        data: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update comment"
      );
    }
  }
);

export const removeComment = createAsyncThunk(
  "blog/removeComment",
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await request.delete(`comments`, {
        data: comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }
);

const initialState = {
  blog: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  comments: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch blog
      .addCase(fetchBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          blog: action.payload,
        };
      })
      .addCase(fetchBlogById.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update blog
      .addCase(updateBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          blog: action.payload,
        };
      })
      .addCase(updateBlog.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch comments
      .addCase(fetchCommentsByBlogId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByBlogId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          comments: action.payload,
        };
      })
      .addCase(fetchCommentsByBlogId.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // add comment
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          comments: state.comments.push(action.payload),
        };
      })
      .addCase(addComment.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update comment
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          comments: state.comments
            .filter(
              (comment) =>
                !(
                  comment.userId === action.payload.userId &&
                  comment.blogId === action.payload.blogId
                )
            )
            .push(action.payload),
        };
      })
      .addCase(updateComment.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update comment
      .addCase(removeComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state = {
          ...state,
          comments: state.comments.filter(
            (comment) =>
              !(
                comment.userId === action.payload.userId &&
                comment.blogId === action.payload.blogId
              )
          ),
        };
      })
      .addCase(removeComment.error, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const blogActions = blogSlice.actions;
export default blogSlice.reducer;
