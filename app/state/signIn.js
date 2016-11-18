/**
 * @providesModule signIn
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generatePostRequest } from 'networking';

export default async function signIn({ action, dispatch, nextDispatchAsync, getState }) {
  dispatch(actions.SHOW_MODAL('Authenticating...'));
  const request = generatePostRequest('https://stagapi.1mgdoctors.com/api/doctor_login', action.payload);
  try {
    const response = await fetch(request);
    const json = await response.json();
    console.log(json);
    if (json.success) {
      dispatch(actions.SHOW_MODAL('Signing in...'));
      const { doctor_guid, phone_access_token } = json;
      const { phone_number } = action.payload;
      dispatch(actions.GET_USER_INFO({
        phone_number,
        doctor_guid,
        phone_access_token
      }));
    } else {
      dispatch(actions.GO_BACK);
    }
  } catch (e) {
    console.error('error', e);
    dispatch(actions.GO_BACK);
  }
}
