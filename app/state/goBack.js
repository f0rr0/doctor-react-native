/**
 * @providesModule goBack
 */

import { NavigationActions } from '@exponent/ex-navigation';

export default function goBack({ dispatch, getState }) {
  const { currentNavigatorUID:  navigatorUID } = getState().navigation;
  dispatch(NavigationActions.pop(navigatorUID));
}
