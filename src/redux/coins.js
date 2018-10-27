import * as ActionTypes from './ActionTypes';
export const Coins = (state = {
  isLoading: true,
  errMess: null,
  coins: null
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COINS:
      return {...state, isLoading: false, errMess: null, coins: action.payload}

    case ActionTypes.COINS_LOADING:
      return {...state, isLoading: true, errMess: null, coins: null}

    case ActionTypes.COINS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, coins: null}

    default:
      return state;
  }
}