/**
 * @providesModule showModalDialog
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import { tail } from 'lodash-es';

export default function showModalDialog({ action, dispatch, getState }) {
  const { type, onConfirm } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'modalActivity' && currentRoute.routeName !== 'modalDialog')) {
    dispatch(NavigationActions.push(navigatorUID, router.getRoute('modalDialog', {
      type,
      onConfirm
    })));
  } else {
    dispatch(NavigationActions.replace(navigatorUID, router.getRoute('modalDialog', {
      type,
      onConfirm
    })));
  }
}
