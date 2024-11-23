import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../../../services/api/job.service';
import Button from '../../../common/Button/Button';
import { formatCurrency } from '../../../../services/utils/helpers';
import styles from './jobCard.module.scss';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
        <span className={styles.company}>{job.company}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.location}>
          <i className="fas fa-map-marker-alt" /> {job.location}
        </span>
        <span className={styles.type}>
          <i className="fas fa-briefcase" /> {job.type}
        </span>
        <span className={styles.salary}>
          <i className="fas fa-money-bill-wave" />
          {formatCurrency(job.salary.min, job.salary.currency)} - 
          {formatCurrency(job.salary.max, job.salary.currency)}
        </span>
      </div>

      <p className={styles.description}>
        {job.description.length > 200
          ? `${job.description.substring(0, 200)}...`
          : job.description}
      </p>

      <div className={styles.footer}>
        <Link to={`/jobs/${job.id}`} className={styles.link}>
          View Details
        </Link>
        <Button onClick={() => onApply(job.id)}>Apply Now</Button>
      </div>
    </div>
  );
};

export default JobCard; 