import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedJob } from '../../store/slices/jobSlice';
import { jobService } from '../../services/api/job.service';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import AlertMessage from '../../components/common/AlertMessage/AlertMessage';
import { ROUTES } from '../../config/constants';
import { RootState } from '../../store';
import styles from './styles/jobDetail.module.scss';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((state: RootState) => state.jobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const job = await jobService.getJobById(id);
        dispatch(setSelectedJob(job));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();

    return () => {
      dispatch(setSelectedJob(null));
    };
  }, [id, dispatch]);

  const handleApply = async () => {
    if (!selectedJob) return;
    
    try {
      await jobService.applyForJob(selectedJob.id);
      navigate(ROUTES.JOBS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply for job');
    }
  };

  if (loading) return <Loader size="large" />;
  if (error) return <AlertMessage type="error" message={error} />;
  if (!selectedJob) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{selectedJob.title}</h1>
        <Button onClick={handleApply}>Apply Now</Button>
      </div>

      <div className={styles.details}>
        <div className={styles.company}>{selectedJob.company}</div>
        <div className={styles.location}>{selectedJob.location}</div>
        <div className={styles.type}>{selectedJob.type}</div>
        <div className={styles.salary}>
          {selectedJob.salary.currency} {selectedJob.salary.min} - {selectedJob.salary.max}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Description</h2>
        <p>{selectedJob.description}</p>
      </div>

      <div className={styles.section}>
        <h2>Requirements</h2>
        <ul className={styles.requirements}>
          {selectedJob.requirements.map((req: string, index: number) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetail; 