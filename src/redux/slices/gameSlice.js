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
    combatLog:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    merchantInventory: [],
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
        state.combatLog = []
    },
    moveFailure: (state) => {
        state.loading = false;
    },
    setError: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    attackStart: (state) => {
        state.loading = true;
        state.error = ''
    },
    attackSuccess: (state, action) => {
        state.loading = false;
        // state.user = action.payload.user
        // state.currentRoom = action.payload.currentRoom
        state.combatLog = [...state.combatLog, action.payload.combatLog]
        // console.log(action.payload)
    },
    attackFailure: (state) => {
        state.loading = false;
    },
    shopStart: (state) => {
        state.loading = true;
        state.error = ''
    },
    shopSuccess: (state) => {
        state.loading = false;
    },
    shopFailure: (state) => {
        state.loading = false;
    },
    updateUserItems: (state, action) => {
        state.user = {
            ...state.user,
            gold: action.payload.gold,
            items: action.payload.items
        }
    },
    updateMerchantItems: (state, action) => {
        state.merchantInventory = action.payload
    },
    getItemStart: (state) => {
        state.loading = true;
        state.error = '';
    },
    getItemSuccess: (state, action) => {
        state.loading = false;
        state.user = {
            ...state.user,
            items: action.payload.items
        };
        state.currentRoom = {
            ...state.currentRoom,
            items: action.payload.roomItems
        };
    },
    getItemFailure: (state) => {
        state.loading = false;},
    dropItemStart: (state) => {
        state.loading = true;
        state.error = '';},
    dropItemSuccess: (state, action) => {
        state.loading = false;
        state.user = {
            ...state.user,
            items: action.payload.items
        };
        state.currentRoom = {
            ...state.currentRoom,
            items: action.payload.roomItems
        };
    },
    dropItemFailure: (state) => {
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
    setError,
    attackStart,
    attackSuccess,
    attackFailure,
    shopStart,
    shopSuccess,
    shopFailure,
    updateUserItems,
    updateMerchantItems,
    getItemStart,
    getItemSuccess,
    getItemFailure,
    dropItemStart,
    dropItemSuccess,
    dropItemFailure,
} = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const handleError = (error) => (dispatch) => {
    dispatch(setError(error))
}

export const gameInit = () => (dispatch) => {
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
                dispatch(setError("You can't move in that direction."))
            }
            else if (res.data === 'monster present, deal with it before leaving the room') {
                dispatch(setError("A monster blocks your path - deal with it first!"))
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
          console.log(err);
        });
};

export const attack = () => (dispatch) => {
    dispatch(attackStart());
    axiosWithAuth()
        .post('/player/combat/', { command: 'attack' })
        .then((res) => {
            dispatch(attackSuccess({
                combatLog: res.data
            }));
            console.log('attack success', res);
        })
        .catch((err) => {
            dispatch(attackFailure())
            console.log(err);
        })
};

export const shop = (command, item) => (dispatch) => {
    let payload = { command: command }

    if (command.includes('buy')) {
        payload = {
            ...payload,
            buy_item: item
        }
    } else if (command.includes('sell')) {
        payload = {
            ...payload,
            sell_item: item
        }
    }

    dispatch(shopStart());

    axiosWithAuth()
        .post('/merchant/', payload)
        .then((res) => {
            if (res.data.error) {
                dispatch(setError(res.data.error))
            } else {
                dispatch(shopSuccess())
                if (command.includes('buy') || command.includes('sell')) {
                    console.log(res.data)
                    const gold = res.data.gold
                    const items = res.data.items
                    dispatch(updateUserItems({ gold: gold, items: items }))
                } else {
                    console.log(res.data)
                    dispatch(updateMerchantItems(res.data))
                }
            }
        })
        .catch((err) => {
            dispatch(shopFailure())
            console.log(err)
        })
};

export const getItem = (item) => (dispatch) => {
    dispatch(getItemStart());

    axiosWithAuth()
        .post('/items/', { command: 'get', item: item })
        .then((res) => {
            if (res.data.error) {
                dispatch(setError(res.data.error))
            } else {
                dispatch(getItemSuccess({ items: res.data.items, roomItems: res.data.room_inventory }));
                console.log(res);
            }
        })
        .catch((err) => {
            dispatch(getItemFailure());
            console.log(err);
        })
};

export const dropItem = (item) => (dispatch) => {
    dispatch(dropItemStart());

    axiosWithAuth()
        .post('/items/', { command: 'drop', item: item })
        .then((res) => {
            if (res.data.error) {
                dispatch(setError(res.data.error));
            } else {
                dispatch(dropItemSuccess({ items: res.data.items, roomItems: res.data.room_inventory }));
                console.log(res);
            }
        })
        .catch((err) => {
            dispatch(dropItemFailure());
            console.log(err);
        })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.gameSlice.value;

export default gameSlice.reducer;
