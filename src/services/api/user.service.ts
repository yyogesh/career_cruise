import { User } from '../../types/auth.types';
import { ApiResponse } from '../../types/common.types';
import api from './axios.config';
import { API_ENDPOINTS } from '../../config/constants';

export interface UpdateUserData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UserWithStatus extends User {
  status: 'active' | 'blocked';
}

export const userService = {
  async getProfile(): Promise<User> {
    const { data } = await api.get<ApiResponse<User>>(API_ENDPOINTS.USER.PROFILE);
    return data.data;
  },

  async updateProfile(userData: UpdateUserData): Promise<User> {
    const { data } = await api.put<ApiResponse<User>>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      userData
    );
    return data.data;
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const { data } = await api.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      {
        currentPassword,
        newPassword,
      }
    );
    return data.data;
  },

  async getAllUsers(): Promise<UserWithStatus[]> {
    const { data } = await api.get<ApiResponse<UserWithStatus[]>>('/api/users');
    return data.data;
  },

  async updateUserStatus(
    userId: string,
    status: 'active' | 'blocked'
  ): Promise<UserWithStatus> {
    const { data } = await api.put<ApiResponse<UserWithStatus>>(
      `/api/users/${userId}/status`,
      { status }
    );
    return data.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/api/users/${userId}`);
  },
}; 