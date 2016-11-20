/**
 * @providesModule BlockingModalActivity
 */

import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import colors from 'colors';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  modal: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    elevation: 8,
    borderRadius: 2,
    elevation: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 19
    },
    shadowRadius: 38
  },
  text: {
    paddingLeft: 20
  }
});

function BlockingModalActivity({ text = 'Loading...' }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 'large' : 65}
          color={colors.turquoise}
        />
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    </View>
  );
}

BlockingModalActivity.route = {
  styles: {
    ...NavigationStyles.Fade,
    sceneAnimations: (props) => {
      const {
        position,
        scene,
      } = props;

      const index = scene.index;
      const inputRange = [index - 1, index, index + 1];

      const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 1],
      });

      return {
        opacity,
        transform: [
          { translateX: 0 },
          { translateY: 0 },
          { scale: 1 },
        ],
        backgroundColor: 'transparent',
        shadowOpacity: 0
      };
    }
  }
};

export default BlockingModalActivity;
