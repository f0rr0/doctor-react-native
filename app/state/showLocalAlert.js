/**
 * @providesModule showLocalAlert
 */

import { NavigationActions } from '@exponent/ex-navigation';
import actions from 'actions';
import router from 'router';
import { tail } from 'lodash-es';

export default function goToRoute({ action, dispatch, getState }) {
  const { message } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'alert' && currentRoute.routeName !== 'modal')) {
    dispatch(NavigationActions.showLocalAlert(navigatorUID, message, {
      text: {
        color: '#000',
        backgroundColor: '#FFEB3B',
        marginHorizontal: 8,
        padding: 12,
        minHeight: 64
      },
      container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }));
  } else {
    dispatch(actions.GO_BACK);
    dispatch(actions.SHOW_LOCAL_ALERT(message));
  }
}
