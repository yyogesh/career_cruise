import React, { useEffect, useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useUI } from '../../hooks/useUI';
import { formatDate } from '../../services/utils/helpers';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import AlertMessage from '../../components/common/AlertMessage/AlertMessage';
import { PAGINATION } from '../../config/constants';
import styles from './styles/myApplications.module.scss';

export const MyApplications: React.FC = () => {
  const {
    applications,
    loading,
    error,
    fetchMyApplications,
    withdrawApplication,
  } = useApplications();
  const { displayAlert } = useUI();
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);

  useEffect(() => {
    fetchMyApplications({ page: currentPage, limit: PAGINATION.DEFAULT_LIMIT });
  }, [fetchMyApplications, currentPage]);

  const handleWithdraw = async (applicationId: string) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      await withdrawApplication(applicationId);
      await fetchMyApplications({
        page: currentPage,
        limit: PAGINATION.DEFAULT_LIMIT,
      });
      displayAlert('success', 'Application withdrawn successfully');
    } catch (err) {
      displayAlert('error', 'Failed to withdraw application');
    }
  };

  if (loading) return <Loader size="large" />;
  if (error) return <AlertMessage type="error" message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Applications</h1>

      {applications.length === 0 ? (
        <div className={styles.empty}>
          <p>You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className={styles.applications}>
          {applications.map((application) => (
            <div key={application.id} className={styles.application}>
              <div className={styles.jobInfo}>
                <h3>{application.job.title}</h3>
                <p className={styles.company}>{application.job.company}</p>
                <div className={styles.details}>
                  <span>{application.job.location}</span>
                  <span>{application.job.type}</span>
                </div>
              </div>
              <div className={styles.applicationInfo}>
                <span className={`${styles.status} ${styles[application.status]}`}>
                  {application.status}
                </span>
                <span className={styles.date}>
                  Applied on {formatDate(application.appliedAt)}
                </span>
                {application.status === 'pending' && (
                  <Button
                    variant="outline"
                    onClick={() => handleWithdraw(application.id)}
                  >
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications; 