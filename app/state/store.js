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

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
});

export function configureStore(onComplete = () => {}) {
  const store = compose(autoRehydrate())(createStoreWithNavigation)(
    combineReducers({
      navigation: NavigationReducer,
      user: userReducer
    }),
    applyMiddleware(effectsMiddleware(effects))
  );
  persistStore(store, { storage: AsyncStorage }, onComplete);
  return store;
}

export default configureStore;
