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
    getSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    failure: (state) => {
      state.loading = false;
    },
    pushMessageAction: (state, action) => {
      console.log('push reducer', [...state.messages, action.payload]);
      state.messages = [...state.messages, action.payload];
    },
    // addMessageAction: (state, action) => {
    //   console.log('add reducer', [...state.messages, action.payload]);
    //   state.messages = [...state.messages, action.payload];
    // },
  },
});

export const {
  start,
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
      // console.log(res);
    })
    .catch((err) => {
      dispatch(failure());
      alert(err.message);
    });
};

export const pushMessage = (message) => (dispatch) => {
  console.log('message', message);
  dispatch(pushMessageAction(message));
};

export const postMessage = (values) => (dispatch) => {
  console.log('values:', values);
  dispatch(start());
  axiosWithAuth()
    .post('/messages/', values)
    .then((res) => {
      // dispatch(addMessageAction(res.data));
      console.log('post res:', res.data);
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
