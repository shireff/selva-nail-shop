import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "customer" | "admin";
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getInitialUserState = (): UserState => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    return {
      currentUser: JSON.parse(user),
      isAuthenticated: true,
      isLoading: false,
      error: null,
    };
  }
  return {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const response = await fetch("https://selva-server.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      return rejectWithValue("Invalid email or password");
    }
    return response.json();
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: {
      name: string;
      email: string;
      phone: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const response = await fetch("https://selva-server.vercel.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      return rejectWithValue("Registration failed");
    }
    return response.json();
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

const userSlice = createSlice({
  name: "user",
  initialState: getInitialUserState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || action.error.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Registration failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearError, updateUser } = userSlice.actions;
export default userSlice.reducer;
