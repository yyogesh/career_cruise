import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/constants';
import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Job Portal</h3>
          <p>Find your dream job or hire the perfect candidate.</p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>
          <nav className={styles.links}>
            <Link to={ROUTES.HOME}>Home</Link>
            <Link to={ROUTES.JOBS}>Browse Jobs</Link>
            <Link to={ROUTES.PROFILE}>Profile</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4>Resources</h4>
          <nav className={styles.links}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h4>Connect With Us</h4>
          <div className={styles.social}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 