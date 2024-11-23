export const APP_NAME = 'Job Portal';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  JOBS: {
    BASE: '/jobs',
    SEARCH: '/jobs/search',
    APPLY: '/jobs/apply',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    CHANGE_PASSWORD: '/user/change-password',
  },
  APPLICATIONS: {
    BASE: '/applications',
    USER: '/applications/user',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  APPLICATIONS: '/applications',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

export const JOB_TYPES = ['full-time', 'part-time', 'contract'] as const;
export type JobType = typeof JOB_TYPES[number];

export const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
export type Currency = typeof CURRENCIES[number]; 