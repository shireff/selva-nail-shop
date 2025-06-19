import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  category: string;
  features: string[];
  isPopular: boolean;
}

interface ServicesState {
  services: Service[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async () => {
    const response = await fetch('https://selva-server.vercel.app/api/services');
    return response.json();
  }
);

export const addService = createAsyncThunk(
  'services/add',
  async (serviceData: Omit<Service, 'id'>) => {
    const response = await fetch('https://selva-server.vercel.app/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    });
    return response.json();
  }
);

export const updateService = createAsyncThunk(
  'services/update',
  async ({ id, data }: { id: string; data: Partial<Service> }) => {
    const response = await fetch(`https://selva-server.vercel.app/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteService = createAsyncThunk(
  'services/delete',
  async (id: string) => {
    await fetch(`https://selva-server.vercel.app/api/services/${id}`, { method: 'DELETE' });
    return id;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.services;
        state.categories = action.payload.categories;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(s => s.id !== action.payload);
      });
  },
});

export const { clearError } = servicesSlice.actions;
export default servicesSlice.reducer;