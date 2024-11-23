import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProfile, setLoading, setError, updateProfile as updateProfileAction } from '../store/slices/userSlice';
import { userService } from '../services/api/user.service';
import { RootState } from '../store';
import { useUI } from './useUI';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state: RootState) => state.user);
  const { displayAlert } = useUI();

  const fetchProfile = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const userData = await userService.getProfile();
      dispatch(setProfile(userData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  const updateUserProfile = useCallback(async (data: { name: string; email: string }) => {
    try {
      dispatch(setLoading(true));
      const updatedUser = await userService.updateProfile(data);
      dispatch(updateProfileAction(updatedUser));
      displayAlert('success', 'Profile updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      dispatch(setLoading(true));
      await userService.changePassword(currentPassword, newPassword);
      displayAlert('success', 'Password changed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      dispatch(setError(errorMessage));
      displayAlert('error', errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, displayAlert]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile: updateUserProfile,
    changePassword,
  };
}; 