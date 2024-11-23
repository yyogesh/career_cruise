import { Job } from '../services/api/job.service';
import { User } from './auth.types';

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface JobApplication {
  id: string;
  job: Job;
  user: User;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  notes?: string;
}

export interface CreateApplicationDto {
  jobId: string;
  notes?: string;
}

export interface UpdateApplicationDto {
  status?: ApplicationStatus;
  notes?: string;
} 