import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import styles from './styles/dashboard.module.scss';

interface StatCard {
  title: string;
  value: number;
  change: number;
  icon: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  const stats: StatCard[] = isAdmin
    ? [
        { title: 'Total Jobs', value: 150, change: 12, icon: '📊' },
        { title: 'Active Jobs', value: 89, change: -5, icon: '🎯' },
        { title: 'Total Applications', value: 432, change: 8, icon: '📝' },
        { title: 'New Users', value: 43, change: 15, icon: '👥' },
      ]
    : [
        { title: 'Applications Sent', value: 12, change: 2, icon: '📝' },
        { title: 'Saved Jobs', value: 8, change: 1, icon: '⭐' },
        { title: 'Profile Views', value: 45, change: 10, icon: '👁️' },
        { title: 'Interviews', value: 3, change: 1, icon: '🤝' },
      ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <h3>{stat.title}</h3>
              <div className={styles.statValue}>
                <span>{stat.value}</span>
                <span
                  className={`${styles.statChange} ${
                    stat.change >= 0 ? styles.positive : styles.negative
                  }`}
                >
                  {stat.change >= 0 ? '+' : ''}
                  {stat.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        {/* Add recent activity list here */}
      </div>
    </div>
  );
};

export default Dashboard; 