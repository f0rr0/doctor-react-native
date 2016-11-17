import React from 'react';
import {
  NavigationContext,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import router from 'router';
import store from 'store';

const navigationContext = new NavigationContext({
  router,
  store
});

export default function doctorApp() {
  return (
    <Provider store={store}>
      <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={router.getRoute('login')} />
      </NavigationProvider>
    </Provider>
  );
}
