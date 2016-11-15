import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.primary,
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
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif-medium',
    fontSize: 20,
    color: colors.text
  },
  subTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Light' : 'sans-serif-light',
    fontSize: 14,
    color: colors.text
  },
  icon: {
    resizeMode: 'contain',
    margin: 19
  }
});

const mapToTouchableIcons = icons => icons.map(({ icon, onPress, style = {} }, index) =>
  <TouchableOpacity
    onPress={onPress}
    key={index}
  >
    <Image
      style={[ styles.icon, style ]}
      source={icon}
    />
  </TouchableOpacity>
);

export default function ActionBar(props) {
  const leftTouchButton = mapToTouchableIcons(props.leftTouchButton);
  const rightTouchButtons = mapToTouchableIcons(props.rightTouchButtons);
  return(
    <View style={styles.container}>
      <View style={styles.leftButtonsContainer}>
        {leftTouchButton}
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

ActionBar.propTypes = {
  leftTouchButton: PropTypes.array.isRequired,
  rightTouchButtons: PropTypes.array,
  styles: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string
}

ActionBar.defaultProps = {
  leftTouchButtons: [],
  rightTouchButtons: []
}
