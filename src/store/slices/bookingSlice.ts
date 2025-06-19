import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  totalPrice: number;
}

interface BookingState {
  availableSlots: { [date: string]: TimeSlot[] };
  userBookings: Booking[];
  currentBooking: Partial<Booking> | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  availableSlots: {},
  userBookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

export const fetchAvailableSlots = createAsyncThunk(
  "booking/fetchAvailableSlots",
  async ({ serviceId, date }: { serviceId: string; date: string }) => {
    const response = await fetch(
      `http://localhost:5000/api/bookings/slots?serviceId=${serviceId}&date=${date}`
    );
    return response.json();
  }
);

export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData: Omit<Booking, "id" | "status">) => {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    return response.json();
  }
);

export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async (bookingId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/confirm`,
      {
        method: "PUT",
      }
    );
    return response.json();
  }
);

export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async () => {
    const response = await fetch("http://localhost:5000/api/bookings/user");
    return response.json();
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (bookingId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/cancel`,
      {
        method: "PUT",
      }
    );
    return response.json();
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    updateCurrentBooking: (state, action) => {
      if (state.currentBooking) {
        state.currentBooking = { ...state.currentBooking, ...action.payload };
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableSlots[action.meta.arg.date] = action.payload.slots;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch available slots";
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBookings.push(action.payload);
        state.currentBooking = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create booking";
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        const index = state.userBookings.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.userBookings = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const index = state.userBookings.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
      });
  },
});

export const {
  setCurrentBooking,
  updateCurrentBooking,
  clearCurrentBooking,
  clearError,
} = bookingSlice.actions;
export default bookingSlice.reducer;
