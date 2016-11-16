/**
 * @providesModule store
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import effects from 'effects';
import { userReducer } from 'reducers';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    user: userReducer,
  }),
  applyMiddleware(effectsMiddleware(effects))
);

export default store;
