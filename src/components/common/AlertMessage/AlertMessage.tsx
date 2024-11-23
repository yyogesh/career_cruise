import React from 'react';
import styles from './alertMessage.module.scss';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  onClose,
  className = '',
}) => {
  return (
    <div 
      className={`${styles.alert} ${styles[type]} ${className}`} 
      role="alert"
      aria-live="polite"
    >
      <p className={styles.message}>{message}</p>
      {onClose && (
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close alert"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AlertMessage; 