import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import messagesReducer from './slices/messagesSlice';
import gameReducer from './slices/gameSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    game: gameReducer,
  },
});
