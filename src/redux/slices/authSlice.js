import { createSlice } from '@reduxjs/toolkit';
import axiosWithAuth from './axiosWithAuth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
    },
  },
});

export const { increment, decrement, loginStart } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const login = () => (dispatch) => {
  dispatch(loginStart());
  console.log(process.env.REACT_APP_API_URL);
  console.log('hey!');
  axiosWithAuth().get('/');
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.auth.value;

export default authSlice.reducer;
