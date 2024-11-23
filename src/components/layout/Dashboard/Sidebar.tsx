import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store';
import styles from './sidebar.module.scss';

interface NavLinkProps {
  isActive: boolean;
}

export const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  const getLinkClassName = ({ isActive }: NavLinkProps): string => {
    return `${styles.link} ${isActive ? styles.active : ''}`;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.userInfo}>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      <nav className={styles.navigation}>
        <NavLink
          to="/dashboard"
          className={getLinkClassName}
          end
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/applications"
          className={getLinkClassName}
        >
          My Applications
        </NavLink>

        {isAdmin && (
          <>
            <NavLink
              to="/dashboard/manage-jobs"
              className={getLinkClassName}
            >
              Manage Jobs
            </NavLink>

            <NavLink
              to="/dashboard/users"
              className={getLinkClassName}
            >
              Manage Users
            </NavLink>
          </>
        )}

        <NavLink
          to="/dashboard/settings"
          className={getLinkClassName}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 