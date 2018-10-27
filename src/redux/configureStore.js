import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Auth } from './auth';
import { Favorites } from './favorites';
import { Coins } from './coins';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      favorites: Favorites,
      coins: Coins
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}