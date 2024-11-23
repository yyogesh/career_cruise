import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './dashboardLayout.module.scss';

export const DashboardLayout: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 