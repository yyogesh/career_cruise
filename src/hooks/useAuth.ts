import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials, setLoading, setError } from '../store/slices/authSlice';
import { authService } from '../services/api/auth.service';
import { LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { ROUTES } from '../config/constants';
import { RootState } from '../store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAppSelector((state: RootState) => state.auth);
  const [loading, setLocalLoading] = useState(false);
  const [error, setLocalError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLocalLoading(true);
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await authService.login(credentials);
      dispatch(setCredentials(response));
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to login';
      dispatch(setError(errorMessage));
      setLocalError(errorMessage);
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLocalLoading(true);
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await authService.register(credentials);
      dispatch(setCredentials(response));
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register';
      dispatch(setError(errorMessage));
      setLocalError(errorMessage);
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    loading: loading || authLoading,
    error: error || authError,
    login,
    register,
  };
};

export default useAuth; 