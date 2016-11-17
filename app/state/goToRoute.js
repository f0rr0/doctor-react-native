/**
 * @providesModule goToRoute
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import { tail } from 'lodash-es';

export default function goToRoute({ action, dispatch, getState }) {
  const { route } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (currentRoute && currentRoute.routeName !== route) {
    dispatch(NavigationActions.push(navigatorUID, router.getRoute(route)));
  } else if (!currentRoute) {
    dispatch(NavigationActions.push(navigatorUID, router.getRoute(route)));
  }
}
