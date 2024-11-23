import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';
import applicationReducer from './slices/applicationSlice';
import { errorMiddleware, loggerMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    user: userReducer,
    ui: uiReducer,
    applications: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware, loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;