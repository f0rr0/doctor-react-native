/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import Home from 'Home';
import AboutUs from 'AboutUs';
import ContactUs from 'ContactUs';

export default createRouter(() => ({
  home: () => Home,
  about: () => AboutUs,
  contact: () => ContactUs
}));
