/**
 * @providesModule BlockingModalDialog
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  dropShadow: {
    elevation: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 19
    },
    shadowRadius: 38
  },
  modal: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    height: 200,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 2,
    zIndex: 1
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    zIndex: 2,
    marginBottom: -40
  },
  icon: {
    width: 80,
    height: 80
  },
  textContainer: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20
  },
  textTitle: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginBottom: 8
  },
  textMessage: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'center'
  },
  button: {
    letterSpacing: 0.5,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.turquoise
  },
  buttonCancel:{
    marginRight: 40
  }
});

function BlockingModalDialog({ type, onConfirm = () => {}, dispatch }) {
  let icon, title, message;
  switch (type) {
    case 'close_conversation':
      icon = require('../assets/drawable-xxhdpi/modal_close_conversation_icon.png');
      title = 'CLOSE CONVERSATION';
      message = 'Are you sure you want to mark this conversation as completed?';
      break;
    case 'mark_spam':
      icon = require('../assets/drawable-xxhdpi/modal_flag_icon.png');
      title = 'MARK AS SPAM';
      message = 'If you mark this as spam you will not see this query again.';
      break;
    case 'sign_out':
      icon = require('../assets/drawable-xxhdpi/modal_speciality_icon.png');
      title = 'SIGN OUT'
      message = 'Are you sure you want to log out?';
      break;
    default:
      icon = require('../assets/drawable-xxhdpi/modal_flag_icon.png');
      title = 'INVALID MODAL TYPE';
      message = 'Set "close_conversation" or "mark_spam"';
  }
  return (
    <View style={styles.modalContainer}>
      <View>
        <View style={[styles.iconContainer, Platform.OS === 'android' ? styles.dropShadow : {} ]}>
          <Image style={styles.icon} source={icon} />
        </View>
        <View style={[ styles.modal, styles.dropShadow ]}>
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textMessage}>
              {message}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => dispatch(actions.GO_BACK)}
            >
              <Text style={styles.button}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              dispatch(actions.GO_BACK);
              onConfirm();
            }}>
              <Text style={styles.button}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

BlockingModalDialog.route = {
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

BlockingModalDialog.propTypes = {
  onConfirm: PropTypes.func,
  type: PropTypes.string.isRequired
}

export default connect(null)(BlockingModalDialog);
