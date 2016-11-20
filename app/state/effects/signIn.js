/**
 * @providesModule signIn
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generatePostRequest } from 'networking';

export default async function signIn({ action, dispatch, nextDispatchAsync, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Authenticating...'));
  const request = generatePostRequest('https://stagapi.1mgdoctors.com/api/doctor_login', action.payload);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (json.success) {
      dispatch(actions.SHOW_MODAL_ACTIVITY('Signing in...'));
      const { doctor_guid, phone_access_token } = json;
      const { phone_number } = action.payload;
      dispatch(actions.GET_USER_INFO({
        phone_number,
        doctor_guid,
        phone_access_token
      }));
    } else {
      const { error } = json;
      dispatch(actions.SHOW_LOCAL_ALERT(error));
    }
  } catch ({ message }) {
    if (message === 'Network request failed') {
      dispatch(actions.SHOW_LOCAL_ALERT('Looks like you are not connected to the internet. Please check the settings and try again.'));
    } else {
      dispatch(actions.SHOW_LOCAL_ALERT(message));
    }
  }
}
