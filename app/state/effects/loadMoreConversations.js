/**
 * @providesModule loadMoreConversations
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateGetRequest } from 'networking';

export default async function loadMoreConversations({ action, dispatch, getState }) {
  const { category, pgn = 1 } = action.payload;
  const { user, speciality } = getState();
  const { second_opinion_id } = speciality;
  const request = generateGetRequest(`https://stagapi.1mgdoctors.com/api/doctor/all_conversations?second_opinion_id=${second_opinion_id}&category=${category}&ppg=6&pgn=${pgn}`, user);
  try {
    const response = await fetch(request);
    const json = await response.json();
    if (!json.error) {
      dispatch(actions.APPEND_CONVERSATIONS(category, json));
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
