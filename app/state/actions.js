/**
 * @providesModule actions
 */

import { createAction } from 'redux-actions';

export default {
  GO_BACK: createAction('GO_BACK')(),
  CLEAR_ROUTE_STACK: (route) => createAction('CLEAR_ROUTE_STACK')({ route }),
  GO_TO_ROUTE: (route, params) => createAction('GO_TO_ROUTE')({ route, params }),
  SHOW_MODAL_ACTIVITY: (text) => createAction('SHOW_MODAL_ACTIVITY')({ text }),
  SHOW_MODAL_DIALOG: (type, onConfirm) => createAction('SHOW_MODAL_DIALOG')({ type, onConfirm }),
  SHOW_LOCAL_ALERT: (message) => createAction('SHOW_LOCAL_ALERT')({ message }),
  SIGN_IN: (credentials) => createAction('SIGN_IN')(credentials),
  SIGN_OUT: createAction('SIGN_OUT')(),
  SEND_OTP: (phone_number) => createAction('SEND_OTP')({ phone_number }),
  VERIFY_OTP: (otp) => createAction('VERIFY_OTP')(otp),
  CHANGE_PASSWORD: (credentials) => createAction('CHANGE_PASSWORD')(credentials),
  RESET_PASSWORD: (credentials) => createAction('RESET_PASSWORD')(credentials),
  SET_USER_INFO: (info) => createAction('SET_USER_INFO')(info),
  GET_USER_INFO: (credentials) => createAction('GET_USER_INFO')(credentials),
  SET_USER_SPECIALITY: (speciality) => createAction('SET_USER_SPECIALITY')(speciality),
  GET_CONVERSATIONS: (category, pgn) => createAction('GET_CONVERSATIONS')({ category, pgn }),
  REFRESH_CONVERSATIONS: (category, pgn) => createAction('REFRESH_CONVERSATIONS')({ category, pgn }),
  LOAD_MORE_CONVERSATIONS: (category, pgn) => createAction('LOAD_MORE_CONVERSATIONS')({ category, pgn }),
  TOGGLE_CONVERSATIONS_LOADING: (category) => createAction('TOGGLE_CONVERSATIONS_LOADING')({ category }),
  TOGGLE_CONVERSATIONS_LOADING_MORE: (category) => createAction('TOGGLE_CONVERSATIONS_LOADING_MORE')({ category }),
  TOGGLE_CONVERSATIONS_REFRESHING: (category) => createAction('TOGGLE_CONVERSATIONS_REFRESHING')({ category }),
  TOGGLE_CONVERSATIONS_ERROR: (category) => createAction('TOGGLE_CONVERSATIONS_ERROR')({ category }),
  SET_CONVERSATIONS: (category, data) => createAction('SET_CONVERSATIONS')({ category, data }),
  APPEND_CONVERSATIONS: (category, data) => createAction('APPEND_CONVERSATIONS')({ category, data }),
  GET_MESSAGES: (conversation) => createAction('GET_MESSAGES')({ conversation }),
  LOAD_MORE_MESSAGES: (conversation, pgn) => createAction('LOAD_MORE_MESSAGES')({ conversation, pgn }),
  TOGGLE_MESSAGES_LOADING: createAction('TOGGLE_MESSAGES_LOADING')(),
  TOGGLE_MESSAGES_ERROR: createAction('TOGGLE_MESSAGES_ERROR')(),
  SET_MESSAGES: (messages) => createAction('SET_MESSAGES')({ messages }),
  TOGGLE_MESSAGES_LOADING_MORE: createAction('TOGGLE_MESSAGES_LOADING_MORE')(),
  SEND_MESSAGE: (conversation, message) => createAction('SEND_MESSAGE')({ conversation, message }),
  APPEND_MESSAGES: (messages) => createAction('APPEND_MESSAGES')({ messages })
};
