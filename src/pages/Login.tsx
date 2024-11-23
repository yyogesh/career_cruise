import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import AlertMessage from '../components/common/AlertMessage/AlertMessage';
import { validateEmail } from '../services/utils/validation';
import { ROUTES } from '../config/constants';
import styles from './styles/auth.module.scss';

export const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await login(formData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        
        {error && (
          <AlertMessage type="error" message={error} />
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={validationErrors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className={styles.links}>
          <Link to={ROUTES.FORGOT_PASSWORD} className={styles.link}>
            Forgot Password?
          </Link>
          <Link to={ROUTES.REGISTER} className={styles.link}>
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 