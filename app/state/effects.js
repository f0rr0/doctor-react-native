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
    action: actions.GO_BACK,
    effect: goBack,
    error: genericErrorHandler
  },
  {
    action: actions.GO_TO_ROUTE,
    effect: goToRoute,
    error: genericErrorHandler
  }
];
