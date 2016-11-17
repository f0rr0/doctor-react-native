/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import Login from 'Login';
import Home from 'Home';
import AboutUs from 'AboutUs';
import ContactUs from 'ContactUs';

export default createRouter(() => ({
  login: () => Login,
  home: () => Home,
  about: () => AboutUs,
  contact: () => ContactUs
}));
