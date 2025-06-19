import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import userSlice from './slices/userSlice';
import servicesSlice from './slices/servicesSlice';
import productsSlice from './slices/productsSlice';
import bookingSlice from './slices/bookingSlice';
import notificationSlice from './slices/notificationSlice';
import blogSlice from './slices/blogSlice';
import testimonialSlice from './slices/testimonialSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    services: servicesSlice,
    products: productsSlice,
    booking: bookingSlice,
    notifications: notificationSlice,
    blog: blogSlice,
    testimonials: testimonialSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;