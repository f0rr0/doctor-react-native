/**
 * @providesModule getMessages
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateGetRequest } from 'networking';

export default async function getMessages({ action, dispatch, getState }) {
  const { conversation, pgn = 1 } = action.payload;
  dispatch(actions.TOGGLE_MESSAGES_LOADING);
  const { user } = getState();
  const request = generateGetRequest(`https://stagapi.1mgdoctors.com/api/doctor/conversation_messages?conversation_id=${conversation.id}&ppg=6`, user);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (!json.error) {
      dispatch(actions.TOGGLE_MESSAGES_LOADING);
      dispatch(actions.SET_MESSAGES(json));
    } else {
      dispatch(actions.TOGGLE_MESSAGES_ERROR);
      const { error } = json;
      dispatch(actions.SHOW_LOCAL_ALERT(error));
    }
  } catch ({ message }) {
    dispatch(actions.TOGGLE_MESSAGES_ERROR);
    if (message === 'Network request failed') {
      dispatch(actions.SHOW_LOCAL_ALERT('Looks like you are not connected to the internet. Please check the settings and try again.'));
    } else {
      dispatch(actions.SHOW_LOCAL_ALERT(message));
    }
  }
}
