/**
 * @providesModule getUserInfo
 */

import { NavigationActions } from '@exponent/ex-navigation';
import router from 'router';
import actions from 'actions';
import { generateGetRequest } from 'networking';

export default async function getUserInfo({ action, dispatch, getState }) {
  const user = action.payload;
  const request = generateGetRequest('https://stagapi.1mgdoctors.com/api/doctor/specialities', user);
  try {
    dispatch(actions.SHOW_MODAL('Signing in...'));
    const response = await fetch(request);
    const json = await response.json();
    if (!json.error) {
      const { specialities, doctor_info: {
        name,
        profile_pic,
        email
      }} = json;
      dispatch(actions.SET_USER_INFO({
        ...user,
        loggedIn: true,
        specialities,
        name,
        profile_pic,
        email
      }));
      dispatch(actions.GO_TO_ROUTE('home'));
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
