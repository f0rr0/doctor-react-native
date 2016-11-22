/**
 * @providesModule getConversations
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateGetRequest } from 'networking';

export default async function getConversations({ action, dispatch, getState }) {
  const { category, pgn = 1 } = action.payload;
  dispatch(actions.TOGGLE_CONVERSATIONS_LOADING(category));
  const { user, speciality } = getState();
  const { second_opinion_id } = speciality;
  const request = generateGetRequest(`https://stagapi.1mgdoctors.com/api/doctor/all_conversations?second_opinion_id=${second_opinion_id}&category=${category}&ppg=6&pgn=${pgn}`, user);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (!json.error) {
      dispatch(actions.TOGGLE_CONVERSATIONS_LOADING(category));
      dispatch(actions.SET_CONVERSATIONS(category, json));
    } else {
      dispatch(actions.TOGGLE_CONVERSATIONS_ERROR(category));
      const { error } = json;
      dispatch(actions.SHOW_LOCAL_ALERT(error));
    }
  } catch ({ message }) {
    dispatch(actions.TOGGLE_CONVERSATIONS_ERROR(category));
    if (message === 'Network request failed') {
      dispatch(actions.SHOW_LOCAL_ALERT('Looks like you are not connected to the internet. Please check the settings and try again.'));
    } else {
      dispatch(actions.SHOW_LOCAL_ALERT(message));
    }
  }
}
