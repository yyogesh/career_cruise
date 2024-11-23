import { JobApplication, CreateApplicationDto, UpdateApplicationDto } from '../../types/application.types';
import { PaginationParams, PaginatedResponse, ApiResponse } from '../../types/common.types';
import api from './axios.config';
import { API_ENDPOINTS } from '../../config/constants';

export const applicationService = {
  async getMyApplications(params: PaginationParams): Promise<PaginatedResponse<JobApplication>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<JobApplication>>>(
      API_ENDPOINTS.APPLICATIONS.USER,
      { params }
    );
    return data.data;
  },

  async getApplicationById(id: string): Promise<JobApplication> {
    const { data } = await api.get<ApiResponse<JobApplication>>(
      `${API_ENDPOINTS.APPLICATIONS.BASE}/${id}`
    );
    return data.data;
  },

  async createApplication(applicationData: CreateApplicationDto): Promise<JobApplication> {
    const { data } = await api.post<ApiResponse<JobApplication>>(
      API_ENDPOINTS.APPLICATIONS.BASE,
      applicationData
    );
    return data.data;
  },

  async updateApplication(
    id: string,
    updateData: UpdateApplicationDto
  ): Promise<JobApplication> {
    const { data } = await api.put<ApiResponse<JobApplication>>(
      `${API_ENDPOINTS.APPLICATIONS.BASE}/${id}`,
      updateData
    );
    return data.data;
  },

  async withdrawApplication(id: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.APPLICATIONS.BASE}/${id}`);
  },

  async getAllApplications(params: PaginationParams): Promise<PaginatedResponse<JobApplication>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<JobApplication>>>(
      API_ENDPOINTS.APPLICATIONS.BASE,
      { params }
    );
    return data.data;
  },
}; 