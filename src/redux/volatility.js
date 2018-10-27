import * as ActionTypes from './ActionTypes';
export const Volatility = (state = {
  isLoading: true,
  errMess: null,
  volatility: null
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_VOLATILITY:
      return {...state, isLoading: false, errMess: null, volatility: action.payload}

    case ActionTypes.VOLATILITY_LOADING:
      return {...state, isLoading: true, errMess: null, volatility: null}

    case ActionTypes.VOLATILITY_FAILED:
      return {...state, isLoading: false, errMess: action.payload, volatility: null}

    default:
      return state;
  }
}