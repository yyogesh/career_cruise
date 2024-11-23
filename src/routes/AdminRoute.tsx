import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ROUTES } from '../config/constants';
import { RootState } from '../store';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute; 