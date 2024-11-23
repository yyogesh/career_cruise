import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../services/api/job.service';
import { PaginatedResponse } from '../../types/common.types';

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  totalJobs: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  totalJobs: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state: JobState, action: PayloadAction<PaginatedResponse<Job>>) => {
      state.jobs = action.payload.data;
      state.totalJobs = action.payload.total;
      state.currentPage = action.payload.page;
    },
    setSelectedJob: (state: JobState, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    setLoading: (state: JobState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: JobState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setJobs, setSelectedJob, setLoading, setError } = jobSlice.actions;
export default jobSlice.reducer; 