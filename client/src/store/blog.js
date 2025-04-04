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
      const response = await request.post(`/comments`, {
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
      const response = await request.put(`/comments`, {
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
      const response = await request.delete(`/comments`, {
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

export const getLikes = createAsyncThunk(
  "blog/getLikes",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await request.get(`/blogs/${blogId}/likes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get users"
      );
    }
  }
);

export const addLike = createAsyncThunk(
  "blog/addLike",
  async ({ userId, blogId }, { rejectWithValue }) => {
    try {
      const response = await request.post(`/likes`, {
        data: { userId, blogId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to like blog"
      );
    }
  }
);

export const removeLike = createAsyncThunk(
  "blog/removeLike",
  async ({ userId, blogId }, { rejectWithValue }) => {
    try {
      const response = await request.delete(`/likes`, {
        data: { userId, blogId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unlike blog"
      );
    }
  }
);

const initialState = {
  blog: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  comments: [],
  likes: [],
};

const handleAsyncCases = (builder, asyncThunk, onSuccess) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = "loading";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      onSuccess(state, action);
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncCases(builder, fetchBlogById, (state, action) => {
      state.blog = action.payload;
    });

    handleAsyncCases(builder, updateBlog, (state, action) => {
      state.blog = action.payload;
    });

    handleAsyncCases(builder, deleteBlog, (state) => {
      Object.assign(state, initialState);
    });

    handleAsyncCases(builder, fetchCommentsByBlogId, (state, action) => {
      state.comments = action.payload;
    });

    handleAsyncCases(builder, addComment, (state, action) => {
      state.comments.push(action.payload);
    });

    handleAsyncCases(builder, updateComment, (state, action) => {
      state.comments = state.comments.filter(
        (comment) =>
          !(
            comment.userId === action.payload.userId &&
            comment.blogId === action.payload.blogId &&
            comment.commentDate === action.payload.commentDate
          )
      );
      state.comments.push(action.payload);
    });

    handleAsyncCases(builder, removeComment, (state, action) => {
      state.comments = state.comments.filter(
        (comment) =>
          !(
            comment.userId === action.payload.userId &&
            comment.blogId === action.payload.blogId &&
            comment.commentDate === action.payload.commentDate
          )
      );
    });

    handleAsyncCases(builder, getLikes, (state, action) => {
      state.likes = action.payload;
    });

    handleAsyncCases(builder, addLike, (state, action) => {
      state.likes.push(action.payload);
    });

    handleAsyncCases(builder, removeLike, (state, action) => {
      state.likes = state.likes.filter(
        (like) =>
          !(
            like.userId === action.payload.userId &&
            like.blogId === action.payload.blogId
          )
      );
    });
  },
});

export const blogActions = blogSlice.actions;
export default blogSlice.reducer;
