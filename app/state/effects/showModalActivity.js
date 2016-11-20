/**
 * @providesModule showModalActivity
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import { tail } from 'lodash-es';

export default function showModalActivity({ action, dispatch, getState }) {
  const { text } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'modalActivity' && currentRoute.routeName !== 'modalDialog')) {
    dispatch(NavigationActions.push(navigatorUID, router.getRoute('modalActivity', {
      text
    })));
  } else {
    dispatch(NavigationActions.replace(navigatorUID, router.getRoute('modalActivity', {
      text
    })));
  }
}
