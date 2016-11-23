/**
 * @providesModule DoctorApp
 */

import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContext,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import { NavigationStyles } from '@exponent/ex-navigation';
import { Provider } from 'react-redux';
import router from 'router';
import configureStore from 'store';

export default class doctorApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  render() {
    const { isLoading, store } = this.state;
    if (isLoading) {
      return null;
    }
    const navigationContext = new NavigationContext({
      router,
      store
    });
    const { user: { loggedIn } } = store.getState();
    return (
      <Provider store={store}>
        <NavigationProvider context={navigationContext}>
            <StackNavigation
              defaultRouteConfig={{
                styles: {
                  ...NavigationStyles.SlideHorizontal,
                  gestures: null
                }
              }}
              initialRoute={ loggedIn ? router.getRoute('home') : router.getRoute('login') }
            />
        </NavigationProvider>
      </Provider>
    );
  }
}
