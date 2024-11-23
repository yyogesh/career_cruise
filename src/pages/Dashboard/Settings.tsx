import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import AlertMessage from '../../components/common/AlertMessage/AlertMessage';
import { validatePassword } from '../../services/utils/validation';
import styles from './styles/settings.module.scss';

export const Settings: React.FC = () => {
  const { profile, loading, error, updateProfile, changePassword } = useProfile();
  const [success, setSuccess] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setSuccess(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setSuccess(null);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    const passwordValidation = validatePassword(passwordData.newPassword);
    if (!passwordValidation.isValid) {
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (!profile) return null;

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>

      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}

      <div className={styles.section}>
        <h2>Profile Information</h2>
        <form onSubmit={handleUpdateProfile}>
          <Input
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      <div className={styles.section}>
        <h2>Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings; 