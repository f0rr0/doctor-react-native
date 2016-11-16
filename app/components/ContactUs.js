/**
 * @providesModule ContactUs
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
  webview: {
    flex: 1
  }
});

function ContactUs({ dispatch }) {
  return (
    <View style={styles.webview}>
      <AppBar
        title="Contact Us"
        leftTouchButton={[{
          icon: require('../assets/drawable-xxhdpi/back_icon.png'),
          onPress: () => dispatch(actions.GO_BACK),
          style: {
           height: 11,
           width: 18
          }
        }]}
      />
      <WebView
        style={styles.webview}
        source={{ uri: "https://www.1mgdoctors.com/contact" }}
        startInLoadingState
      />
    </View>
  );
}

ContactUs.route = {
  styles: {
    ...NavigationStyles.SlideHorizontal
  }
};

export default connect(null)(ContactUs);
