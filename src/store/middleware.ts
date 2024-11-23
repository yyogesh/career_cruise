import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './index';
import { setError } from './slices/uiSlice';
import { logout } from './slices/authSlice';

export const errorMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.error) {
      const errorMessage =
        action.payload?.message || 'An unexpected error occurred';
      dispatch(setError(errorMessage));

      // Handle authentication errors
      if (action.payload?.status === 401) {
        dispatch(logout());
      }
    }

    return next(action);
  };

export const loggerMiddleware: Middleware<{}, RootState> =
  () => (next) => (action) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(action.type);
      console.info('dispatching', action);
      const result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result;
    }

    return next(action);
  }; 