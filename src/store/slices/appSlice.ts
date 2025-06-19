import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  isInitialized: boolean;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'en',
  isInitialized: false,
};

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async () => {
    // Initialize app data, check auth, load settings
    const response = await fetch('/api/initialize');
    return response.json();
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to initialize app';
      });
  },
});

export const { setLoading, setError, clearError, setTheme, setLanguage } = appSlice.actions;
export default appSlice.reducer;