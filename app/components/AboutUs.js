/**
 * @providesModule AboutUs
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';
import AppBar from 'AppBar';
import colors from 'colors';

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: colors.white
  }
});

const removeNavsFrom1mgWebView = 'var header = document.querySelector(".header-wrapper"); if (header) { header.parentNode.removeChild(header); } var footer = document.querySelector(".footer-wrapper"); if (footer) { footer.parentNode.removeChild(footer); }';

export default function AboutUs() {
  return (
    <View style={styles.full}>
      <AppBar title="About Us" />
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
