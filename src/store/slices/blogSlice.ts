/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  isPublished: boolean;
}

interface BlogState {
  posts: BlogPost[];
  categories: string[];
  featuredPosts: BlogPost[];
  currentPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  categories: [],
  featuredPosts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchPosts",
  async (params?: { category?: string; limit?: number; search?: string }) => {
    const queryParams = new URLSearchParams(params as any);
    const response = await fetch(
      `https://selva-server.vercel.app/api/blog?${queryParams}`
    );
    return response.json();
  }
);

export const fetchBlogPost = createAsyncThunk(
  "blog/fetchPost",
  async (id: string) => {
    const response = await fetch(`https://selva-server.vercel.app/api/blog/${id}`);
    return response.json();
  }
);

export const createBlogPost = createAsyncThunk(
  "blog/create",
  async (
    postData: Omit<
      BlogPost,
      "id" | "publishedAt" | "updatedAt" | "views" | "likes"
    >
  ) => {
    const response = await fetch("https://selva-server.vercel.app/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return response.json();
  }
);

export const updateBlogPost = createAsyncThunk(
  "blog/update",
  async ({ id, data }: { id: string; data: Partial<BlogPost> }) => {
    const response = await fetch(`https://selva-server.vercel.app/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteBlogPost = createAsyncThunk(
  "blog/delete",
  async (id: string) => {
    await fetch(`https://selva-server.vercel.app/api/blog/${id}`, { method: "DELETE" });
    return id;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.categories = action.payload.categories;
        state.featuredPosts = action.payload.featuredPosts;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch blog posts";
      })
      .addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearError, clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;
