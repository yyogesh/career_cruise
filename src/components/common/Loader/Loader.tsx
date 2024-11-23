import React from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium',
  className = '',
  fullScreen = false,
}) => {
  const containerClassName = `${styles.container} ${
    fullScreen ? styles.fullScreen : ''
  } ${className}`;

  return (
    <div className={containerClassName}>
      <div className={`${styles.loader} ${styles[size]}`} role="status">
        <div className={styles.spinner} />
        <span className={styles.srOnly}>Loading...</span>
      </div>
    </div>
  );
};

export default Loader; 