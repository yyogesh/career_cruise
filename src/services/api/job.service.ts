import { PaginationParams, PaginatedResponse } from '../../types/common.types';
import api from './axios.config';
import { API_ENDPOINTS } from '../../config/constants';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'contract';
  createdAt: string;
  updatedAt: string;
}

export interface JobFilter {
  search?: string;
  location?: string;
  type?: Job['type'];
  minSalary?: number;
}

export const jobService = {
  async getJobs(params: PaginationParams & Partial<JobFilter>): Promise<PaginatedResponse<Job>> {
    const { data } = await api.get<PaginatedResponse<Job>>(API_ENDPOINTS.JOBS.BASE, {
      params,
    });
    return data;
  },

  async getJobById(id: string): Promise<Job> {
    const { data } = await api.get<Job>(`${API_ENDPOINTS.JOBS.BASE}/${id}`);
    return data;
  },

  async applyForJob(jobId: string): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>(
      `${API_ENDPOINTS.JOBS.BASE}/${jobId}/apply`
    );
    return data;
  },

  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    const { data } = await api.post<Job>(API_ENDPOINTS.JOBS.BASE, jobData);
    return data;
  },

  async updateJob(
    id: string,
    jobData: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Job> {
    const { data } = await api.put<Job>(`${API_ENDPOINTS.JOBS.BASE}/${id}`, jobData);
    return data;
  },

  async deleteJob(id: string): Promise<void> {
    await api.delete(`${API_ENDPOINTS.JOBS.BASE}/${id}`);
  },
}; 