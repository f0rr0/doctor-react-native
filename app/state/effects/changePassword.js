/**
 * @providesModule changePassword
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generatePostRequest } from 'networking';

export default async function changePassword({ action, dispatch, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Applying changes...'));
  const { user } = getState();
  const request = generatePostRequest('https://stagapi.1mgdoctors.com/api/doctor/change_password', action.payload, user);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (json.success) {
      dispatch(actions.GO_TO_ROUTE('home'));
      dispatch(actions.SHOW_LOCAL_ALERT(json.success));
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
