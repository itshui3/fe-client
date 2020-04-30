import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import messagesReducer from './slices/messagesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    messages: messagesReducer,
  },
});
