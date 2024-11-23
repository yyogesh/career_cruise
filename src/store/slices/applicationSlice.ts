import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobApplication } from '../../types/application.types';
import { PaginatedResponse } from '../../types/common.types';

interface ApplicationState {
  applications: JobApplication[];
  selectedApplication: JobApplication | null;
  totalApplications: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  selectedApplication: null,
  totalApplications: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (
      state: ApplicationState,
      action: PayloadAction<PaginatedResponse<JobApplication>>
    ) => {
      state.applications = action.payload.data;
      state.totalApplications = action.payload.total;
      state.currentPage = action.payload.page;
    },
    setSelectedApplication: (
      state: ApplicationState,
      action: PayloadAction<JobApplication | null>
    ) => {
      state.selectedApplication = action.payload;
    },
    setLoading: (state: ApplicationState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: ApplicationState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearApplications: (state: ApplicationState) => {
      state.applications = [];
      state.selectedApplication = null;
      state.totalApplications = 0;
      state.currentPage = 1;
    },
  },
});

export const {
  setApplications,
  setSelectedApplication,
  setLoading,
  setError,
  clearApplications,
} = applicationSlice.actions;

export default applicationSlice.reducer; 