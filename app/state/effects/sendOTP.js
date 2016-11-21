/**
 * @providesModule sendOTP
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateUnauthenticatedPostRequest } from 'networking';

export default async function sendOTP({ action, dispatch, nextDispatchAsync, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Sending...'));
  const request = generateUnauthenticatedPostRequest('https://stagapi.1mgdoctors.com/api/doctor/send_otp', action.payload);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (json.success) {
      dispatch(actions.GO_BACK);
      dispatch(actions.SET_USER_INFO(actions.payload));
      dispatch(actions.GO_TO_ROUTE('verifyOTP'));
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
