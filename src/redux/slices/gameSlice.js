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
        items: '',
        NPCs: '',
        mobs: '',
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
    attackStart: (state) => {
        state.loading = true;
        state.error = ''
    },
    attackSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user
        state.currentRoom = action.payload.currentRoom
    },
    attackFailure: (state) => {
        state.loading = false;
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
    noExit,
    attackStart,
    attackSuccess,
    attackFailure
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
        const map = res.data.map.sort((a, b) => (a.id > b.id) ? 1 : -1)
        dispatch(gameInitSuccess({
            user: res.data.user,
            currentRoom: res.data.room,
            map: map
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
            if (res.data === 'ya done goofed, no room here') {
                dispatch(noExit("You can't move in that direction."))
            }
            else if (res.data === 'monster present, deal with it before leaving the room') {
                dispatch(noExit("A monster blocks your path - deal with it first!"))
            }
            else{                
                const map = res.data.map.sort((a, b) => (a.id > b.id) ? 1 : -1)
                dispatch(moveSuccess({
                    user: res.data.user,
                    currentRoom: res.data.room,
                    map: map
                }))
            }
        })
        .catch((err) => {
            dispatch(moveFailure())
          console.log(err)
        });
};

export const attack = () => (dispatch) => {
    dispatch(attackStart());
    axiosWithAuth()
        .post('/player/combat/', { command: 'attack' })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            dispatch(attackFailure())
            console.log(err)
        })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.gameSlice.value;

export default gameSlice.reducer;
