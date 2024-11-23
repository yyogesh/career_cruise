import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { showAlert, hideAlert, setModalOpen, setModalContent } from '../store/slices/uiSlice';
import { AlertType } from '../components/common/AlertMessage/AlertMessage';
import { RootState } from '../store';

export const useUI = () => {
  const dispatch = useAppDispatch();
  const { alert, isModalOpen, modalContent } = useAppSelector((state: RootState) => state.ui);

  const displayAlert = useCallback(
    (type: AlertType, message: string, duration = 3000) => {
      dispatch(showAlert({ type, message }));
      setTimeout(() => {
        dispatch(hideAlert());
      }, duration);
    },
    [dispatch]
  );

  const openModal = useCallback(
    (content: string) => {
      dispatch(setModalContent(content));
      dispatch(setModalOpen(true));
    },
    [dispatch]
  );

  const closeModal = useCallback(() => {
    dispatch(setModalOpen(false));
    dispatch(setModalContent(null));
  }, [dispatch]);

  return {
    alert,
    isModalOpen,
    modalContent,
    displayAlert,
    openModal,
    closeModal,
  };
}; 