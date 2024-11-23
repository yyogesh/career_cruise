import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { ROUTES } from '../config/constants';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const Profile = lazy(() => import('../pages/Profile'));
const Jobs = lazy(() => import('../pages/Jobs'));
const JobDetail = lazy(() => import('../pages/Jobs/JobDetail'));
const DashboardLayout = lazy(() => import('../components/layout/Dashboard/DashboardLayout'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const MyApplications = lazy(() => import('../pages/Dashboard/MyApplications'));
const ManageJobs = lazy(() => import('../pages/Dashboard/ManageJobs'));
const ManageUsers = lazy(() => import('../pages/Dashboard/ManageUsers'));
const Settings = lazy(() => import('../pages/Dashboard/Settings'));

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