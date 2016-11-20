/**
 * @providesModule effects
 */

import actions from 'actions';
import goBack from 'goBack';
import goToRoute from 'goToRoute';
import clearRouteStack from 'clearRouteStack';
import showModalActivity from 'showModalActivity';
import showModalDialog from 'showModalDialog';
import showLocalAlert from 'showLocalAlert';
import signIn from 'signIn';
import signOut from 'signOut';
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
    action: actions.CLEAR_ROUTE_STACK().type,
    effect: clearRouteStack,
    error: genericErrorHandler
  },
  {
    action: actions.SHOW_MODAL_ACTIVITY().type,
    effect: showModalActivity,
    error: genericErrorHandler
  },
  {
    action: actions.SHOW_MODAL_DIALOG().type,
    effect: showModalDialog,
    error: genericErrorHandler
  },
  {
    action: actions.SHOW_LOCAL_ALERT().type,
    effect: showLocalAlert,
    error: genericErrorHandler
  },
  {
    action: actions.SIGN_IN().type,
    effect: signIn,
    error: genericErrorHandler
  },
  {
    action: actions.SIGN_OUT.type,
    effect: signOut,
    error: genericErrorHandler
  },
  {
    action: actions.GET_USER_INFO().type,
    effect: getUserInfo,
    error: genericErrorHandler
  }
];
