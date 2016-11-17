/**
 * @providesModule AboutUs
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import AppBar from 'AppBar';
import actions from 'actions';

const styles = StyleSheet.create({
  full: {
    flex: 1
  }
});

const removeNavsFrom1mgWebView = 'var header = document.querySelector(".header-wrapper"); if (header) { header.parentNode.removeChild(header); } var footer = document.querySelector(".footer-wrapper"); if (footer) { footer.parentNode.removeChild(footer); }';

function AboutUs({ dispatch }) {
  return (
    <View style={styles.full}>
      <AppBar
        title="About Us"
        leftTouchButtons={[{
          icon: require('../assets/drawable-xxhdpi/back_icon.png'),
          onPress: () => dispatch(actions.GO_BACK),
          style: {
           height: 11,
           width: 18
          }
        }]}
      />
      <WebView
        source={{
          uri: "https://www.1mgdoctors.com/about?source=react_native_app"
        }}
        startInLoadingState
        injectedJavaScript={removeNavsFrom1mgWebView}
      />
    </View>
  );
}

AboutUs.route = {
  styles: {
    ...NavigationStyles.SlideHorizontal,
    gestures: null
  }
};

export default connect(null)(AboutUs);
