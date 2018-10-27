import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/**
 * Coins
 * 
 */
export const coinsLoading = () => ({
  type: ActionTypes.COINS_LOADING
});

export const coinsFailed = (errMess) => ({
  type: ActionTypes.COINS_FAILED,
  payload: errMess
});

export const addCoins = (coins) => ({
  type: ActionTypes.ADD_COINS,
  payload: coins
});

export const fetchCoins = () => (dispatch) => {
  const cc = require('cryptocompare');
  dispatch(coinsLoading(true));
  return cc.coinList()
  .then(response => {
    if(response) {
      return response.Data;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    throw error;
  })
  .then(coins => dispatch(addCoins(coins)))
  .catch(error => dispatch(coinsFailed(error.message)));
}