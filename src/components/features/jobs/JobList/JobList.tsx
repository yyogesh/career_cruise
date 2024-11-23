import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { jobService, Job } from '../../../../services/api/job.service';
import { setJobs, setLoading, setError } from '../../../../store/slices/jobSlice';
import JobCard from '../JobCard/JobCard';
import Loader from '../../../common/Loader/Loader';
import styles from './jobList.module.scss';
import { RootState } from '../../../../store';

export const JobList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs, loading, error } = useAppSelector((state: RootState) => state.jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(setLoading(true));
        const response = await jobService.getJobs({ page: 1, limit: 10 });
        dispatch(setJobs(response));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch jobs'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleApply = async (jobId: string) => {
    try {
      await jobService.applyForJob(jobId);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  if (loading) return <Loader size="large" />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {jobs.map((job: Job) => (
        <JobCard key={job.id} job={job} onApply={handleApply} />
      ))}
    </div>
  );
};

export default JobList; 