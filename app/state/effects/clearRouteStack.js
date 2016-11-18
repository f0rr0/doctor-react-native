/**
 * @providesModule clearRouteStack
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import { tail } from 'lodash-es';

export default function clearRouteStack({ action, dispatch, getState }) {
  const { route } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (currentStack.length > 1 || (currentRoute && currentRoute.routeName !== route)) {
    dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [
      router.getRoute(route)
    ]));
  }
}
