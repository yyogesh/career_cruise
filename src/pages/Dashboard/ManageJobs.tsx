import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { jobService, Job } from '../../services/api/job.service';
import { setJobs, setLoading, setError } from '../../store/slices/jobSlice';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import JobForm from '../../components/features/jobs/JobForm/JobForm';
import AlertMessage from '../../components/common/AlertMessage/AlertMessage';
import { RootState } from '../../store';
import styles from './styles/manageJobs.module.scss';

export const ManageJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs, loading, error } = useAppSelector((state: RootState) => state.jobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleCreateJob = async (jobData: Partial<Job>) => {
    try {
      dispatch(setLoading(true));
      await jobService.createJob(jobData as Omit<Job, 'id' | 'createdAt' | 'updatedAt'>);
      const response = await jobService.getJobs({ page: 1, limit: 10 });
      dispatch(setJobs(response));
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to create job'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditJob = async (jobId: string, jobData: Partial<Job>) => {
    try {
      dispatch(setLoading(true));
      await jobService.updateJob(jobId, jobData);
      const response = await jobService.getJobs({ page: 1, limit: 10 });
      dispatch(setJobs(response));
      setIsModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to update job'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      dispatch(setLoading(true));
      await jobService.deleteJob(jobId);
      const response = await jobService.getJobs({ page: 1, limit: 10 });
      dispatch(setJobs(response));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to delete job'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Jobs</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create New Job</Button>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      <div className={styles.jobList}>
        {jobs.map((job: Job) => (
          <div key={job.id} className={styles.jobItem}>
            <div className={styles.jobInfo}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <span className={styles.jobType}>{job.type}</span>
            </div>
            <div className={styles.actions}>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedJob(job.id);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDeleteJob(job.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        title={selectedJob ? 'Edit Job' : 'Create New Job'}
      >
        <JobForm
          initialData={selectedJob ? jobs.find((job: Job) => job.id === selectedJob) : undefined}
          onSubmit={selectedJob ? 
            (data) => handleEditJob(selectedJob, data) : 
            handleCreateJob
          }
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default ManageJobs; 