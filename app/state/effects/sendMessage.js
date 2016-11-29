/**
 * @providesModule sendMessage
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generatePostRequest } from 'networking';

export default async function sendMessage({ action, dispatch, getState }) {
  dispatch(actions.SHOW_MODAL_ACTIVITY('Sending...'));
  const { user } = getState();
  const { conversation: { id: conversation_id }, message } = action.payload;
  const sendPayload = {
    conversation_id,
    message
  };
  const request = generatePostRequest('https://stagapi.1mgdoctors.com/api/doctor/add_conversation_message', sendPayload, user);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (json.success) {
      dispatch(actions.GO_BACK);
      const { conversation } = action.payload;
      dispatch(actions.GET_MESSAGES(conversation));
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
