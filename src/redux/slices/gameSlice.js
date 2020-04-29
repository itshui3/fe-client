import { createSlice } from '@reduxjs/toolkit';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    loading: false,
    user: {
        name: ''
    },
    currentRoom: {
        title: '',
        description: ''
    }
  },
  reducers: {
    gameInitStart: (state) => {
      state.loading = true;
    },
    gameInitSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user
      state.currentRoom = action.payload.currentRoom
    },
    gameInitFailure: (state) => {
      state.loading = false;
    },
    moveStart: (state) => {
        state.loading = true;
    },
    moveSuccess: (state, action) => {
        state.loading = false;
      state.user = action.payload.user
      state.currentRoom = action.payload.currentRoom
    },
    moveFailure: (state) => {
        state.loading = false;}
  },
});

export const {
    gameInitStart,
    gameInitSuccess,
    gameInitFailure,
    moveStart,
    moveSuccess,
    moveFailure
} = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const gameInit = (values) => (dispatch) => {
  dispatch(gameInitStart());
  axiosWithAuth()
    .get('/adv/init/')
    .then((res) => {
        const user = { name: res.data.name }
        const currentRoom = {
            title: res.data.title,
            description: res.data.description
        }
        dispatch(gameInitSuccess({ user: user, currentRoom: currentRoom }))
        console.log(user)
        console.log(currentRoom)
    })
    .catch((err) => {
      console.log(err)
    });
};

export const move = (direction) => (dispatch) => {
    dispatch(moveStart());
    axiosWithAuth()
        .post('/adv/move/', { direction: direction })
        .then((res) => {
            const user = { name: res.data.name }
            const currentRoom = {
                title: res.data.title,
                description: res.data.description
            }
            dispatch(gameInitSuccess({ user: user, currentRoom: currentRoom }))
            console.log(user)
            console.log(currentRoom)
        })
        .catch((err) => {
          console.log(err)
        });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.gameSlice.value;

export default gameSlice.reducer;
