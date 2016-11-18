/**
 * @providesModule effects
 */

import actions from 'actions';
import goBack from 'goBack';
import goToRoute from 'goToRoute';
import showModal from 'showModal';
import signIn from 'signIn';
import getUserInfo from 'getUserInfo';

function genericErrorHandler({ action, error }) {
  console.log({error, action});
}

export default [
  {
    action: actions.GO_BACK.type,
    effect: goBack,
    error: genericErrorHandler
  },
  {
    action: actions.GO_TO_ROUTE().type,
    effect: goToRoute,
    error: genericErrorHandler
  },
  {
    action: actions.SHOW_MODAL().type,
    effect: showModal,
    error: genericErrorHandler
  },
  {
    action: actions.SIGN_IN().type,
    effect: signIn,
    error: genericErrorHandler
  },
  {
    action: actions.GET_USER_INFO().type,
    effect: getUserInfo,
    error: genericErrorHandler
  }
];
