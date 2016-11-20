/**
 * @providesModule showLocalAlert
 */

import { Alert } from 'react-native';
import actions from 'actions';
import router from 'router';
import { tail } from 'lodash-es';

export default function showLocalAlert({ action, dispatch, getState }) {
  const { message } = action.payload;
  const { navigation } = getState();
  const { currentNavigatorUID:  navigatorUID } = navigation;
  const { routes: currentStack } = navigation.navigators[navigatorUID];
  const currentRoute = tail(currentStack).pop();
  if (!currentRoute || (currentRoute && currentRoute.routeName !== 'modalDialog' && currentRoute.routeName !== 'modalActivity')) {
    Alert.alert('1mg Doctors', message, [{
      text: 'Dismiss',
      style: 'cancel'
    }]);
  } else {
    dispatch(actions.GO_BACK);
    dispatch(actions.SHOW_LOCAL_ALERT(message));
  }
}
