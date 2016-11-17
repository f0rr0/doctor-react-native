/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import Login from 'Login';
import SendOTP from 'SendOTP';
import Home from 'Home';
import AboutUs from 'AboutUs';
import ContactUs from 'ContactUs';

export default createRouter(() => ({
  login: () => Login,
  sendOTP: () => SendOTP, 
  home: () => Home,
  about: () => AboutUs,
  contact: () => ContactUs
}));
