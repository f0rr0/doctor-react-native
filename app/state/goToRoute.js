/**
 * @providesModule goToRoute
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';

export default function goToRoute({ action, dispatch, getState }) {
  const { route } = action.payload;
  const { currentNavigatorUID:  navigatorUID } = getState().navigation;
  dispatch(NavigationActions.push(navigatorUID, router.getRoute(route)));
}
