import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import {fetchFavorites, favoritesFailed} from './Actions/Favorites.js';

/**
 * Signup
 * 
 */
export const requestSignup = (creds) => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
    payload: creds
  }
}

export const receiveSignup = (response) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    paylaod: response.token
  }
}

export const signupError = (message) => {
  return {
      type: ActionTypes.SIGNUP_FAILURE,
      payload: message
  }
}

export const signupUser = (creds) => (dispatch) => {
  dispatch(requestSignup(creds));

  return fetch(baseUrl + 'users/signup', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
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
  .then(response => {
    if(response.success){
      console.log('Sign Up Succeed!');
      const userInfo = {username: creds.username, password: creds.password};
      console.log('creds= ' + JSON.stringify(creds));
      console.log('userInfo= ' + JSON.stringify(userInfo));
      console.log('response= ' + JSON.stringify(response));
      localStorage.setItem('token', response.token);
      localStorage.setItem('creds', JSON.stringify(userInfo));
      dispatch(receiveSignup(response));
      dispatch(fetchFavorites());
    } else {
      var error = new Error('Error ' + response.status);
      error.response = response;
      throw error;
    }
  })
  .catch(error => dispatch(signupError(error.message)));
};


/**
 * Login
 * 
 */
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload: creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: response.token
  }
}

export const loginError = (message) => {
  return {
      type: ActionTypes.LOGIN_FAILURE,
      payload: message
  }
}

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds));

  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
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
  .then(response => {
    if(response.success){
      // If login was successful, set the token in local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('creds', JSON.stringify(creds));
      // Dispatch the success action
      dispatch(receiveLogin(response));
      dispatch(fetchFavorites());
    } else {
      var error = new Error('Error ' + response.status);
      error.response = response;
      throw error;
    }
  })
  .catch(error => dispatch(loginError(error.message)));
};

/**
 * Logout
 * 
 */
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(receiveLogout());
  dispatch(favoritesFailed('Error 401: Unauthorized'));
}