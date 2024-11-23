import React from 'react';
import { lazy, LazyExoticComponent } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from '../config/constants';

// Lazy load components
const Home: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Home'));
const Login: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Login'));
const Register: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Register'));
const ForgotPassword: LazyExoticComponent<React.FC> = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword: LazyExoticComponent<React.FC> = lazy(() => import('../pages/ResetPassword'));
const Profile: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Profile'));
const Jobs: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Jobs'));
const JobDetail: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Jobs/JobDetail'));
const DashboardLayout: LazyExoticComponent<React.FC> = lazy(() => import('../components/layout/Dashboard/DashboardLayout'));
const Dashboard: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Dashboard'));
const MyApplications: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Dashboard/MyApplications'));
const ManageJobs: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Dashboard/ManageJobs'));
const ManageUsers: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Dashboard/ManageUsers'));
const Settings: LazyExoticComponent<React.FC> = lazy(() => import('../pages/Dashboard/Settings'));

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
  },
  {
    path: ROUTES.JOBS,
    element: <Jobs />,
  },
  {
    path: `${ROUTES.JOBS}/:id`,
    element: <JobDetail />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'applications',
        element: <MyApplications />,
      },
      {
        path: 'manage-jobs',
        element: <ManageJobs />,
      },
      {
        path: 'users',
        element: <ManageUsers />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]; 