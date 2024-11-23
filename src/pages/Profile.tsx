import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setError, updateProfile } from '../store/slices/userSlice';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import AlertMessage from '../components/common/AlertMessage/AlertMessage';
import { validateEmail, validateName } from '../services/utils/validation';
import { userService } from '../services/api/user.service';
import { RootState } from '../store';
import styles from './styles/profile.module.scss';

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state: RootState) => state.user);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      dispatch(setError('Please enter a valid email address'));
      return;
    }

    if (!validateName(formData.name)) {
      dispatch(setError('Name must be between 2 and 50 characters'));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const updatedUser = await userService.updateProfile(formData);
      dispatch(updateProfile(updatedUser));
      setSuccess('Profile updated successfully');
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to update profile'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!profile) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Profile Settings</h1>

        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 