import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { userService, UserWithStatus } from '../../services/api/user.service';
import { setError } from '../../store/slices/uiSlice';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import AlertMessage from '../../components/common/AlertMessage/AlertMessage';
import { useUI } from '../../hooks/useUI';
import styles from './styles/manageUsers.module.scss';

export const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayAlert } = useUI();
  const [users, setUsers] = useState<UserWithStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'blocked') => {
    try {
      setLoading(true);
      await userService.updateUserStatus(userId, newStatus);
      await fetchUsers();
      displayAlert('success', `User ${newStatus === 'active' ? 'activated' : 'blocked'} successfully`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user status';
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);
      await userService.deleteUser(userId);
      await fetchUsers();
      displayAlert('success', 'User deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader size="large" />;
  if (error) return <AlertMessage type="error" message={error} />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Users</h1>

      <div className={styles.userList}>
        <div className={styles.header}>
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.email}>{user.email}</span>
            <span className={styles.role}>{user.role}</span>
            <span className={`${styles.status} ${styles[user.status]}`}>
              {user.status}
            </span>
            <div className={styles.actions}>
              <Button
                variant="outline"
                onClick={() =>
                  handleStatusChange(
                    user.id,
                    user.status === 'active' ? 'blocked' : 'active'
                  )
                }
              >
                {user.status === 'active' ? 'Block' : 'Activate'}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers; 