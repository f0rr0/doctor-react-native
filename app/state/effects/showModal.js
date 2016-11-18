/**
 * @providesModule showModal
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import { tail } from 'lodash-es';

export default function showModal({ action, dispatch, getState }) {
  const { text } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'modal')) {
    dispatch(NavigationActions.push(navigatorUID, router.getRoute('modal', {
      text
    })));
  } else {
    dispatch(NavigationActions.replace(navigatorUID, router.getRoute('modal', {
      text
    })));
  }
}
