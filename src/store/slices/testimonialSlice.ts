/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Testimonial {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  review: string;
  serviceUsed: string;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
  isApproved: boolean;
  isFeatured: boolean;
}

interface TestimonialState {
  testimonials: Testimonial[];
  featuredTestimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  featuredTestimonials: [],
  isLoading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchAll',
  async (params?: { approved?: boolean; featured?: boolean }) => {
    const queryParams = new URLSearchParams(params as any);
    const response = await fetch(`https://selva-server.vercel.app/api/testimonials?${queryParams}`);
    return response.json();
  }
);

export const addTestimonial = createAsyncThunk(
  'testimonials/add',
  async (testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'isApproved'>) => {
    const response = await fetch('https://selva-server.vercel.app/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonialData),
    });
    return response.json();
  }
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/update',
  async ({ id, data }: { id: string; data: Partial<Testimonial> }) => {
    const response = await fetch(`https://selva-server.vercel.app/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/delete',
  async (id: string) => {
    await fetch(`https://selva-server.vercel.app/api/testimonials/${id}`, { method: 'DELETE' });
    return id;
  }
);

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonials = action.payload.testimonials;
        state.featuredTestimonials = action.payload.featuredTestimonials;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch testimonials';
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.unshift(action.payload);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
      });
  },
});

export const { clearError } = testimonialSlice.actions;
export default testimonialSlice.reducer;