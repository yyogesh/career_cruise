import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertType } from '../../components/common/AlertMessage/AlertMessage';

interface UIState {
  alert: {
    show: boolean;
    type: AlertType;
    message: string;
  };
  isModalOpen: boolean;
  modalContent: string | null;
}

const initialState: UIState = {
  alert: {
    show: false,
    type: 'info',
    message: '',
  },
  isModalOpen: false,
  modalContent: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert: (
      state: UIState,
      action: PayloadAction<{ type: AlertType; message: string }>
    ) => {
      state.alert = {
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    hideAlert: (state: UIState) => {
      state.alert.show = false;
    },
    setModalOpen: (state: UIState, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setModalContent: (state: UIState, action: PayloadAction<string | null>) => {
      state.modalContent = action.payload;
    },
  },
});

export const { showAlert, hideAlert, setModalOpen, setModalContent } =
  uiSlice.actions;
export default uiSlice.reducer; 