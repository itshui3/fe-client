import { createSlice } from '@reduxjs/toolkit';
import { axiosWithBaseURL } from '../utils/axiosWithBaseUrl';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    success: (state) => {
      state.loading = false;
    },
    failure: (state) => {
      state.loading = false;
    },
  },
});

export const { start, success, failure } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const login = (values, history) => (dispatch) => {
  dispatch(start());
  axiosWithBaseURL()
    .post('/login/', values)
    .then((res) => {
      console.log(res)
      dispatch(success());
      localStorage.setItem('token', res && res.data && res.data.key);
      history.push('/game');
    })
    .catch((err) => {
      dispatch(failure());
      alert(err.message);
    });
};

export const register = (values, history) => (dispatch) => {
  dispatch(start());
  axiosWithBaseURL()
    .post('/registration/', values)
    .then((res) => {
      dispatch(success());
      localStorage.setItem('token', res && res.data && res.data.key);
      history.push('/game');
    })
    .catch((err) => {
      dispatch(failure());
      alert(err.message);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.auth.value;

export default authSlice.reducer;
