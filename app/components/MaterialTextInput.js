/**
 * @providesModule MaterialTextInput
 */

import React from 'react';
import { Image } from 'react-native';
import TextInput from 'react-native-md-textinput-1mg';

const hideIcon = <Image
  source={require('../assets/drawable-xxhdpi/hide.png')}
  style={{
    height: 15,
    width: 19,
    marginTop: 10
  }}
/>;

const showIcon = <Image
  source={require('../assets/drawable-xxhdpi/show.png')}
  style={{
    height: 11,
    width: 19,
    marginTop: 12
  }}
/>;

export default function MaterialTextInput({ showUnmask, ...props }) {
  if (showUnmask) {
    return (
      <TextInput
        {...props}
        secureTextAllowUnmask
        secureTextAllowUnmaskIconOn={showIcon}
        secureTextAllowUnmaskIconOff={hideIcon}
      />
    );
  }
  return (
    <TextInput {...props} />
  );
}
