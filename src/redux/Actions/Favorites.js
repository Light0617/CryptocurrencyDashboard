import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/**
 * Favorite
 * 
 */
export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errMess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errMess
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites
});


export const postFavorite = (coinKey) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + coinKey, {
    method: "POST",
    body: JSON.stringify({"coinKey": coinKey}),
    headers: {
      "Content-Type": "application/json",
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
    if(response.ok) {
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
  .then(favorites => {
    console.log('Favorite Added', favorites);
    dispatch(fetchFavorites());
    dispatch(addFavorites(favorites));
  })
  .catch(error => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (coinKey) => (dispatch) => {
  console.log('coinKey', coinKey);
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + coinKey, {
    method: "DELETE",
    headers: {
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
    if(response.ok) {
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
  .then(favorites => {
    console.log('Favorite Deleted', favorites);
    dispatch(fetchFavorites());
    dispatch(addFavorites(favorites));
  })
  .catch(error => dispatch(favoritesFailed(error.message)));
}

export const fetchFavorites = () => (dispatch) => {
  const token = localStorage.getItem('token');
  console.log('token', token)
  if(!token) {
    dispatch(addFavorites([]))
  }
  dispatch(favoritesLoading(true));
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/', {
    headers: {
      'Authorization': bearer
    },
  })
  .then(response => {
    if(response.ok) {
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
  .then(favorites => dispatch(addFavorites(favorites)))
  .catch(error => dispatch(favoritesFailed(error.message)));
}