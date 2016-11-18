/**
 * @providesModule Profile
 */

import React, { Component } from 'react';
import {
  View,
  WebView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import AppBar from 'AppBar';

const styles = StyleSheet.create({
  full: {
    flex: 1
  }
});

const removeNavsFrom1mgWebView = 'var header = document.querySelector(".header-wrapper"); if (header) { header.parentNode.removeChild(header); } var footer = document.querySelector(".footer-wrapper"); if (footer) { footer.parentNode.removeChild(footer); }';

function Profile({ user }) {
  return (
    <View style={styles.full}>
      <AppBar title="Doctor 1mg Profile" />
      <WebView
        source={{
          uri: `https://www.1mgdoctors.com/doctor/${user.doctor_guid}?source=react_native_ap`
        }}
        startInLoadingState
        injectedJavaScript={removeNavsFrom1mgWebView}
      />
    </View>
  );
}

export default connect(({ user }) => ({ user }))(Profile);
