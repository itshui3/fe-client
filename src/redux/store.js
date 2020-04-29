import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    game: gameReducer
  },
});
