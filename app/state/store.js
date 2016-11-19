/**
 * @providesModule store
 */

import { AsyncStorage } from 'react-native';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { effectsMiddleware } from 'redux-effex';
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation';
import effects from 'effects';
import { userReducer } from 'reducers';

export function configureStore(onComplete = () => {}) {
  const createStoreWithNavigation = createNavigationEnabledStore({
    createStore,
    navigationStateKey: 'navigation'
  });
  const enhancer = compose(
    applyMiddleware(effectsMiddleware(effects)),
    autoRehydrate(),
    global.reduxNativeDevTools ? global.reduxNativeDevTools() : noop => noop
  );
  const store = createStoreWithNavigation(
    combineReducers({
      navigation: NavigationReducer,
      user: userReducer
    }),
    enhancer
  );
  persistStore(store, { storage: AsyncStorage }, onComplete);
  return store;
}

export default configureStore;
