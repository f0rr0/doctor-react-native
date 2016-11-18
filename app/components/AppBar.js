/**
 * @providesModule AppBar
 */

import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import actions from 'actions';
import colors from 'colors';

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 76 : 56,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.gunmetal,
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftButtonsContainer: {
    paddingRight: 16
  },
  titleContainer: {
    flexGrow: 1,
    flexDirection: 'column'
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'sans-serif-medium',
    fontSize: 20,
    color: colors.white
  },
  subTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Light' : 'sans-serif-light',
    fontSize: 14,
    color: colors.white
  },
  icon: {
    resizeMode: 'contain',
    margin: 19
  }
});

const mapToTouchableIcons = icons => icons.map(({ icon, onPress, style = {} }, index) =>
  <TouchableOpacity
    activeOpacity={1}
    onPress={onPress}
    key={index}
  >
    <Image
      style={[ styles.icon, style ]}
      source={icon}
    />
  </TouchableOpacity>
);

function AppBar(props) {
  const leftTouchButtons = Array.isArray(props.leftTouchButtons) ? mapToTouchableIcons(props.leftTouchButtons) : mapToTouchableIcons([{
    icon: require('../assets/drawable-xxhdpi/back_icon.png'),
    onPress: () => props.dispatch(actions.GO_BACK),
    style: {
     height: 11,
     width: 18
    }
  }]);
  const rightTouchButtons = mapToTouchableIcons(props.rightTouchButtons);
  return(
    <View style={styles.container}>
      <View style={styles.leftButtonsContainer}>
        {leftTouchButtons}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {props.title}
        </Text>
        {
          props.subTitle ?
            <Text style={styles.subTitle}>
              {props.subTitle}
            </Text>
          :
            null
        }
      </View>
      {rightTouchButtons}
    </View>
  );
}

export default connect(null)(AppBar);

AppBar.propTypes = {
  leftTouchButtons: PropTypes.array,
  rightTouchButtons: PropTypes.array,
  styles: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string
};

AppBar.defaultProps = {
  rightTouchButtons: []
};
