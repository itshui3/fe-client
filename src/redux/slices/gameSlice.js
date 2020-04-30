import { createSlice } from '@reduxjs/toolkit';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    loading: false,
    error: '',
    user: {
        username: '',
        character_name: '',
        character_type: '',
        portrait: '',
        HP: 0,
        MP: 0,
        attack: 0,
        gold: 0,
        encounter_cd: 0,
        items: '',
        current_room: ''
    },
    currentRoom: {
        title: '',
        description: '',
        floor: '',
        items: [],
        NPCs: [],
        north: null,
        south: null,
        west: null,
        east: null
    },
    map: []
  },
  reducers: {
    gameInitStart: (state) => {
        state.loading = true;
        state.error = ''
    },
    gameInitSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user
        state.currentRoom = action.payload.currentRoom
        state.map = action.payload.map
    },
    gameInitFailure: (state) => {
        state.loading = false;
    },
    moveStart: (state) => {
        state.loading = true;
        state.error = ''
    },
    moveSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user
        state.currentRoom = action.payload.currentRoom
        state.map = action.payload.map
    },
    moveFailure: (state) => {
        state.loading = false;
    },
    noExit: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
  },
});

export const {
    gameInitStart,
    gameInitSuccess,
    gameInitFailure,
    moveStart,
    moveSuccess,
    moveFailure,
    noExit
} = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const gameInit = (values) => (dispatch) => {
  dispatch(gameInitStart());
  axiosWithAuth()
    .get('/player/startgame/')
    .then((res) => {
        dispatch(gameInitSuccess({
            user: res.data.user,
            currentRoom: res.data.room,
            map: res.data.map
        }))
    })
    .catch((err) => {
        dispatch(gameInitFailure())
      console.log(err)
    });
};

export const move = (direction) => (dispatch) => {
    dispatch(moveStart());
    axiosWithAuth()
        .post('/player/movement/', { direction: direction })
        .then((res) => {
            console.log(res)
            if (res.data === 'ya done goofed, no room here') {
                dispatch(noExit("You can't move in that direction."))
            }
            else{
                dispatch(moveSuccess({
                    user: res.data.user,
                    currentRoom: {
                        ...res.data.room,
                        items: res.data.room.items.split(' '),
                        NPCs: res.data.room.NPCs.split(' ')
                    },
                    map: res.data.map
                }))
            }
        })
        .catch((err) => {
            dispatch(moveFailure())
          console.log(err)
        });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.gameSlice.value;

export default gameSlice.reducer;
