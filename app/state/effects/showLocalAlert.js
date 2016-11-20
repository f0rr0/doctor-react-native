/**
 * @providesModule showLocalAlert
 */

import { NavigationActions } from '@exponent/ex-navigation';
import actions from 'actions';
import router from 'router';
import { tail } from 'lodash-es';
import colors from 'colors';

export default function goToRoute({ action, dispatch, getState }) {
  const { message } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'alert' && currentRoute.routeName !== 'modalActivity')) {
    dispatch(NavigationActions.showLocalAlert(navigatorUID, message, {
      text: {
        color: colors.white,
        backgroundColor: colors.jet,
        fontSize: 14,
        marginHorizontal: 8,
        paddingHorizontal: 19,
        paddingVertical: 16
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
