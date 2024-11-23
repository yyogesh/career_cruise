import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import AlertMessage from '../components/common/AlertMessage/AlertMessage';
import { validatePassword } from '../services/utils/validation';
import { authService } from '../services/api/auth.service';
import { ROUTES } from '../config/constants';
import styles from './styles/auth.module.scss';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className={styles.container}>
        <AlertMessage type="error" message="Invalid or expired reset token" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await authService.resetPassword(token, formData.password);
      navigate(ROUTES.LOGIN, { 
        state: { message: 'Password reset successful. Please login with your new password.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Reset Password</h1>

        {error && <AlertMessage type="error" message={error} />}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 