/**
 * @providesModule effects
 */

import actions from 'actions';
import goBack from 'goBack';
import goToRoute from 'goToRoute';

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
  }
];
