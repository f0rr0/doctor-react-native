/**
 * @providesModule verifyOTP
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateUnauthenticatedPostRequest } from 'networking';

export default async function verifyOTP({ action, dispatch, nextDispatchAsync, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Verifying...'));
  const { phone_number } = getState().user;
  const request = generateUnauthenticatedPostRequest('https://stagapi.1mgdoctors.com/api/doctor/verify_otp', {
    phone_number,
    otp: actions.payload
  });
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (json.success) {
      dispatch(actions.GO_TO_ROUTE('login'));
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
