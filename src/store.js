import { configureStore } from '@reduxjs/toolkit';
import authReducer from './setup/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});