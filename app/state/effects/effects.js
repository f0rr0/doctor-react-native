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
import changePassword from 'changePassword';
import resetPassword from 'resetPassword';
import sendOTP from 'sendOTP';
import verifyOTP from 'verifyOTP';
import getUserInfo from 'getUserInfo';
import getConversations from 'getConversations';
import refreshConversations from 'refreshConversations';
import loadMoreConversations from 'loadMoreConversations';
import getMessages from 'getMessages';
import loadMoreMessages from 'loadMoreMessages';
import sendMessage from 'sendMessage';

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
    action: actions.CHANGE_PASSWORD().type,
    effect: changePassword,
    error: genericErrorHandler
  },
  {
    action: actions.RESET_PASSWORD().type,
    effect: resetPassword,
    error: genericErrorHandler
  },
  {
    action: actions.SEND_OTP().type,
    effect: sendOTP,
    error: genericErrorHandler
  },
  {
    action: actions.VERIFY_OTP().type,
    effect: verifyOTP,
    error: genericErrorHandler
  },
  {
    action: actions.GET_USER_INFO().type,
    effect: getUserInfo,
    error: genericErrorHandler
  },
  {
    action: actions.GET_CONVERSATIONS().type,
    effect: getConversations,
    error: genericErrorHandler
  },
  {
    action: actions.REFRESH_CONVERSATIONS().type,
    effect: refreshConversations,
    error: genericErrorHandler
  },
  {
    action: actions.LOAD_MORE_CONVERSATIONS().type,
    effect: loadMoreConversations,
    error: genericErrorHandler
  },
  {
    action: actions.GET_MESSAGES().type,
    effect: getMessages,
    error: genericErrorHandler
  },
  {
    action: actions.LOAD_MORE_MESSAGES().type,
    effect: loadMoreMessages,
    error: genericErrorHandler
  },
  {
    action: actions.SEND_MESSAGE().type,
    effect: sendMessage,
    error: genericErrorHandler
  }
];
