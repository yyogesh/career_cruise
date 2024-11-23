import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setJobs, setSelectedJob, setLoading, setError } from '../store/slices/jobSlice';
import { jobService, Job, JobFilter } from '../services/api/job.service';
import { PaginationParams } from '../types/common.types';
import { RootState } from '../store';
import { useUI } from './useUI';

export const useJobs = () => {
  const dispatch = useAppDispatch();
  const { jobs, selectedJob, totalJobs, currentPage, loading, error } = useAppSelector(
    (state: RootState) => state.jobs
  );
  const { displayAlert } = useUI();

  const fetchJobs = useCallback(
    async (params: PaginationParams & Partial<JobFilter>) => {
      try {
        dispatch(setLoading(true));
        const response = await jobService.getJobs(params);
        dispatch(setJobs(response));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch jobs';
        dispatch(setError(errorMessage));
        displayAlert('error', errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, displayAlert]
  );

  const fetchJobById = useCallback(
    async (id: string) => {
      try {
        dispatch(setLoading(true));
        const job = await jobService.getJobById(id);
        dispatch(setSelectedJob(job));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch job details';
        dispatch(setError(errorMessage));
        displayAlert('error', errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, displayAlert]
  );

  const applyForJob = useCallback(
    async (jobId: string) => {
      try {
        dispatch(setLoading(true));
        await jobService.applyForJob(jobId);
        displayAlert('success', 'Successfully applied for the job!');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to apply for job';
        dispatch(setError(errorMessage));
        displayAlert('error', errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, displayAlert]
  );

  return {
    jobs,
    selectedJob,
    totalJobs,
    currentPage,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    applyForJob,
  };
}; 