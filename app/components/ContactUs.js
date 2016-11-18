/**
 * @providesModule ContactUs
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';
import AppBar from 'AppBar';

const styles = StyleSheet.create({
  full: {
    flex: 1
  }
});

const removeNavsFrom1mgWebView = 'var header = document.querySelector(".header-wrapper"); if (header) { header.parentNode.removeChild(header); } var footer = document.querySelector(".footer-wrapper"); if (footer) { footer.parentNode.removeChild(footer); }';

export default function ContactUs() {
  return (
    <View style={styles.full}>
      <AppBar title="Contact Us" />
      <WebView
        source={{
          uri: "https://www.1mgdoctors.com/contact?source=react_native_app"
        }}
        startInLoadingState
        injectedJavaScript={removeNavsFrom1mgWebView}
      />
    </View>
  );
}
