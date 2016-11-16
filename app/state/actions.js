/**
 * @providesModule actions
 */

import { createAction } from 'redux-actions';

export default {
 GO_BACK: createAction("GO_BACK")(),
 GO_TO_ROUTE: (route) => createAction('GO_TO_ROUTE')({ route })
};
