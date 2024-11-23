import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth.types';

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state: UserState, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    updateProfile: (state: UserState, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: UserState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state: UserState) => {
      state.profile = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer; 