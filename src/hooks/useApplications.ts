import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { applicationService } from '../services/api/application.service';
import { RootState } from '../store';
import { useUI } from './useUI';
import { 
  setApplications, 
  setSelectedApplication, 
  setLoading, 
  setError 
} from '../store/slices/applicationSlice';
import { PaginationParams } from '../types/common.types';
import { CreateApplicationDto, UpdateApplicationDto } from '../types/application.types';

export const useApplications = () => {
  const dispatch = useAppDispatch();
  const { applications, selectedApplication, loading, error } = useAppSelector(
    (state: RootState) => state.applications
  );
  const { displayAlert } = useUI();

  const fetchMyApplications = useCallback(async (params: PaginationParams) => {
    try {
      dispatch(setLoading(true));
      const response = await applicationService.getMyApplications(params);
      dispatch(setApplications(response));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  const createApplication = useCallback(async (data: CreateApplicationDto) => {
    try {
      dispatch(setLoading(true));
      const application = await applicationService.createApplication(data);
      displayAlert('success', 'Application submitted successfully');
      return application;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  const updateApplication = useCallback(async (id: string, data: UpdateApplicationDto) => {
    try {
      dispatch(setLoading(true));
      const application = await applicationService.updateApplication(id, data);
      displayAlert('success', 'Application updated successfully');
      return application;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update application';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  const withdrawApplication = useCallback(async (id: string) => {
    try {
      dispatch(setLoading(true));
      await applicationService.withdrawApplication(id);
      displayAlert('success', 'Application withdrawn successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to withdraw application';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  return {
    applications,
    selectedApplication,
    loading,
    error,
    fetchMyApplications,
    createApplication,
    updateApplication,
    withdrawApplication,
  };
}; 