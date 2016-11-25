/**
 * @providesModule router
 */

import { createRouter } from '@exponent/ex-navigation';
import BlockingModalActivity from 'BlockingModalActivity';
import BlockingModalDialog from 'BlockingModalDialog';
import Login from 'Login';
import ChangePassword from 'ChangePassword';
import ResetPassword from 'ResetPassword';
import SendOTP from 'SendOTP';
import VerifyOTP from 'VerifyOTP';
import Home from 'Home';
import Spam from 'Spam';
import AboutUs from 'AboutUs';
import ContactUs from 'ContactUs';
import Profile from 'Profile';
import Messages from 'Messages';

export default createRouter(() => ({
  modalActivity: () => BlockingModalActivity,
  modalDialog: () => BlockingModalDialog,
  login: () => Login,
  sendOTP: () => SendOTP,
  verifyOTP: () => VerifyOTP,
  changePassword: () => ChangePassword,
  resetPassword: () => ResetPassword,
  home: () => Home,
  spam: () => Spam,
  about: () => AboutUs,
  contact: () => ContactUs,
  profile: () => Profile,
  messages: () => Messages
}), {
  ignoreSerializableWarnings: true
});
