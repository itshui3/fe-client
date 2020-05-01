import { createSlice } from '@reduxjs/toolkit';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    loading: false,
    messages: [],
  },
  reducers: {
    start: (state) => {
      state.loading = true;
    },
    success: (state) => {
      state.loading = false;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    failure: (state) => {
      state.loading = false;
    },
    pushMessageAction: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const {
  start,
  success,
  getSuccess,
  failure,
  pushMessageAction,
  addMessageAction,
} = messagesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getMessages = () => (dispatch) => {
  dispatch(start());
  axiosWithAuth()
    .get('/messages/')
    .then((res) => {
      dispatch(getSuccess(res.data));
    })
    .catch((err) => {
      dispatch(failure());
      alert(err.message);
    });
};

export const pushMessage = (message) => (dispatch) => {
  dispatch(pushMessageAction(message));
};

export const postMessage = (values) => (dispatch) => {
  dispatch(start());
  axiosWithAuth()
    .post('/messages/', values)
    .then((res) => {
      dispatch(success());
      // dispatch(addMessageAction(res.data));
    })
    .catch((err) => {
      dispatch(failure());
      alert(err.message);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const viewMessages = (state) => state.messages.messages;

export default messagesSlice.reducer;
