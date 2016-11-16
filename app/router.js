/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import Home from 'Home';
import AboutUs from 'AboutUs';

export default createRouter(() => ({
  home: () => Home,
  about: () => AboutUs
}));
