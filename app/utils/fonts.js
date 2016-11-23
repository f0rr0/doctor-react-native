/**
 * @providesModule fonts
 */

import { Platform } from 'react-native';

export default Platform.OS === 'ios' ? {
  regular: 'AvenirNext-Regular',
  medium: 'AvenirNext-Medium',
  light: 'AvenirNext-UltraLight'
} : {
  regular: 'sans-serif',
  medium: 'sans-serif-medium',
  light: 'sans-serif-light'
};
