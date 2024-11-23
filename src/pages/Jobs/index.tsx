import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import JobList from '../../components/features/jobs/JobList/JobList';
import JobFilter from '../../components/features/jobs/JobFilter/JobFilter';
import { JobFilterValues } from '../../components/features/jobs/JobFilter/JobFilter';
import { setJobs, setLoading, setError } from '../../store/slices/jobSlice';
import { jobService } from '../../services/api/job.service';
import styles from './styles/jobs.module.scss';

export const Jobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = async (filters: JobFilterValues) => {
    try {
      dispatch(setLoading(true));
      const response = await jobService.getJobs({
        page: currentPage,
        limit: 10,
        search: filters.search,
        location: filters.location,
        type: filters.type as 'full-time' | 'part-time' | 'contract' | undefined,
        minSalary: filters.minSalary ? Number(filters.minSalary) : undefined,
      });
      dispatch(setJobs(response));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch jobs'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find Your Next Job</h1>
      <JobFilter onFilter={handleFilter} />
      <JobList />
    </div>
  );
};

export default Jobs; 