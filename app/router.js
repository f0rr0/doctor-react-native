/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import Home from 'Home';

export default createRouter(() => ({
  home: () => Home
}));
