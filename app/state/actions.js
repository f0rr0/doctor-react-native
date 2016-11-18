/**
 * @providesModule actions
 */

import { createAction } from 'redux-actions';

export default {
 GO_BACK: createAction('GO_BACK')(),
 GO_TO_ROUTE: (route) => createAction('GO_TO_ROUTE')({ route }),
 SHOW_MODAL: (text) => createAction('SHOW_MODAL')({ text }),
 SIGN_IN: (credentials) => createAction('SIGN_IN')(credentials),
 SET_USER_INFO: (info) => createAction('SET_USER_INFO')(info),
 GET_USER_INFO: (credentials) => createAction('GET_USER_INFO')(credentials)
};
