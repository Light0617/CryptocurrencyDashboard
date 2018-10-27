import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/**
 * Volatility
 * 
 */
export const volatilityLoading = () => ({
  type: ActionTypes.VOLATILITY_LOADING
});

export const volatilityFailed = (errMess) => ({
  type: ActionTypes.VOLATILITY_FAILED,
  payload: errMess
});

export const addVolatility = (volatility) => ({
  type: ActionTypes.ADD_VOLATILITY,
  payload: volatility
});

export const fetchVolatility = () => (dispatch) => {
  dispatch(volatilityLoading(true));
  return fetch(baseUrl + 'stats/volatility')
  .then(response => {
    if(response.ok) {
      console.log('res', response)
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    throw error;
  })
  .then(response => response.json())
  .then(volatility => {
    console.log('volatility', volatility)
    dispatch(addVolatility(volatility))
  })
  .catch(error => dispatch(volatilityFailed(error.message)));
}