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
      items: null,
      current_room: '',
    },
    currentRoom: {
      title: '',
      description: '',
      floor: '',
      items: null,
      NPCs: null,
      mobs: null,
      north: null,
      south: null,
      west: null,
      east: null,
    },
    currentNPC: {
      id: null,
      name: '',
      description: '',
      items: null,
      gold: 0,
      HP: 0,
      isHostile: false,
      attack: 0,
    },
    combatLog: [],
    merchantInventory: [],
    map: [],
  },
  reducers: {
    gameInitStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    gameInitSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.currentRoom = action.payload.currentRoom;
      state.map = action.payload.map;
      state.currentNPC = action.payload.npc
    },
    gameInitFailure: (state) => {
      state.loading = false;
    },
    moveStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    moveSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.currentRoom = action.payload.currentRoom;
      state.currentNPC = action.payload.npc;
      state.map = action.payload.map;
      state.combatLog = [];
    },
    moveFailure: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    combatStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    combatSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.currentRoom = action.payload.room;
      state.combatLog = action.payload.combat.message;
      // console.log(action.payload.combat.message[0])
    },
    combatFailure: (state) => {
      state.loading = false;
    },
    shopStart: (state) => {
      state.loading = true;
      state.error = '';
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
        items: action.payload.items,
      };
    },
    updateMerchantItems: (state, action) => {
      state.merchantInventory = action.payload;
    },
    getItemStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    getItemSuccess: (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        items: action.payload.items,
      };
      state.currentRoom = {
        ...state.currentRoom,
        items: action.payload.roomItems,
      };
    },
    getItemFailure: (state) => {
      state.loading = false;
    },
    dropItemStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    dropItemSuccess: (state, action) => {
      state.loading = false;
      state.user = {
        ...state.user,
        items: action.payload.items,
      };
      state.currentRoom = {
        ...state.currentRoom,
        items: action.payload.roomItems,
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
  combatStart,
  combatSuccess,
  combatFailure,
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
  dispatch(setError(error));
};

// get game data upon navigating to the page or refreshing
export const gameInit = () => (dispatch) => {
  dispatch(gameInitStart());
  axiosWithAuth()
    .get('/player/startgame/')
    .then((res) => {
      const map = res.data.map.sort((a, b) => (a.id > b.id ? 1 : -1));
      dispatch(
        gameInitSuccess({
          user: res.data.user,
          currentRoom: res.data.room,
          map: map,
        })
      );
    })
    .catch((err) => {
      dispatch(gameInitFailure());
      console.log(err);
    });
};

// move in a given direction
// will return an error if there is a wall in the way or a monster is blocking your path
export const move = (direction) => (dispatch) => {
  dispatch(moveStart());
  axiosWithAuth()
    .post('/player/movement/', { direction: direction })
    .then((res) => {
      console.log(res.data);
      if (res.data.error) {
        dispatch(setError(res.data.error));
      } else {
        const map = res.data.map.sort((a, b) => (a.id > b.id ? 1 : -1));
        dispatch(
          moveSuccess({
            user: res.data.user,
            currentRoom: res.data.room,
            npc: res.data.npc,
            map: map,
          })
        );
      }
    })
    .catch((err) => {
      dispatch(moveFailure());
      console.log(err);
    });
};

// attack or run from a a monster
// will return an error if there is no monster present
export const combat = (command) => (dispatch) => {
  dispatch(combatStart());
  axiosWithAuth()
    .post('/player/combat/', { command: command })
    .then((res) => {
      console.log(res.data);
      if (res.data.error) {
        dispatch(setError(res.data.error));
      } else {
        dispatch(
          combatSuccess({
            combat: res.data.combat,
            room: res.data.room,
            user: res.data.user,
          })
        );
      }
    })
    .catch((err) => {
      dispatch(combatFailure());
      console.log(err);
    });
};

// view a merchant's inventory and buy/sell items
// will return error if item is out of stock
export const shop = (command, item) => (dispatch) => {
  let payload = { command: command };

  if (command.includes('buy')) {
    payload = {
      ...payload,
      buy_item: item,
    };
  } else if (command.includes('sell')) {
    payload = {
      ...payload,
      sell_item: item,
    };
  }

  dispatch(shopStart());

  axiosWithAuth()
    .post('/merchant/', payload)
    .then((res) => {
      if (res.data.error) {
        dispatch(setError(res.data.error));
      } else {
        dispatch(shopSuccess());
        if (command.includes('buy') || command.includes('sell')) {
          const gold = res.data.gold;
          const items = res.data.items;
          dispatch(updateUserItems({ gold: gold, items: items }));
        } else {
          dispatch(updateMerchantItems(res.data));
        }
      }
    })
    .catch((err) => {
      dispatch(shopFailure());
      console.log(err);
    });
};

// get an item
// will return an error if item isn't in room
export const getItem = (item) => (dispatch) => {
  dispatch(getItemStart());

  axiosWithAuth()
    .post('/items/', { command: 'get', item: item })
    .then((res) => {
      if (res.data.error) {
        dispatch(setError(res.data.error));
      } else {
        dispatch(
          getItemSuccess({
            items: res.data.items,
            roomItems: res.data.room_inventory,
          })
        );
      }
    })
    .catch((err) => {
      dispatch(getItemFailure());
      console.log(err);
    });
};

// drop an item
// will return an error if item isn't present in inventory
export const dropItem = (item) => (dispatch) => {
  dispatch(dropItemStart());

  axiosWithAuth()
    .post('/items/', { command: 'drop', item: item })
    .then((res) => {
      if (res.data.error) {
        dispatch(setError(res.data.error));
      } else {
        dispatch(
          dropItemSuccess({
            items: res.data.items,
            roomItems: res.data.room_inventory,
          })
        );
      }
    })
    .catch((err) => {
      dispatch(dropItemFailure());
      console.log(err);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.gameSlice.value;

export default gameSlice.reducer;
