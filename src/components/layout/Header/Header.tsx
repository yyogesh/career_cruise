import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';
import Button from '../../common/Button/Button';
import { ROUTES } from '../../../config/constants';
import { RootState } from '../../../store';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          Job Portal
        </Link>

        <nav className={styles.nav}>
          <Link to={ROUTES.JOBS} className={styles.link}>
            Browse Jobs
          </Link>
          {user ? (
            <>
              <Link to={ROUTES.DASHBOARD} className={styles.link}>
                Dashboard
              </Link>
              <Button variant="text" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="text">Sign In</Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 