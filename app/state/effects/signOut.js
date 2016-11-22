/**
 * @providesModule signOut
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';

export default async function signOut({ dispatch, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Signing out...'));
  dispatch(actions.GO_TO_ROUTE('login'));
  dispatch(actions.SET_USER_INFO({
    loggedIn: false,
    phone_access_token: null
  }));
}
