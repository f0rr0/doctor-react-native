import React, { PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import colors from '../utils/colors';

// {
//   "specialities": [
//     {
//       "second_opinion_id": 4,
//       "status": "deleted",
//       "name": "Skin Specialist",
//       "new_queries_count": 0
//     },
//     {
//       "second_opinion_id": 6,
//       "status": "deleted",
//       "name": "General Physician",
//       "new_queries_count": 0
//     }
//   ],
//   "total_count": 2,
//   "doctor_info": {
//     "name": "Dr. Demo Account",
//     "profile_pic": null,
//     "email": null,
//     "speciality": "Dermatology"
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  infoContainer: {
    height: 172,
    backgroundColor: colors.gunmetal
  },
  profilePic: {
    marginTop: 40,
    marginLeft: 16,
    marginBottom: 11,
    height: 64,
    width: 64,
    borderRadius: 32
  },
  text: {
    marginLeft: 16,
    color: colors.white,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 14,
    lineHeight: 21
  },
  phoneNumber: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Light' : 'sans-serif-light'
  },
  navigationContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: colors.white,
  },
  button: {
    height: 48,
    justifyContent: 'center'
  },
  blackText: {
    color: colors.black
  },
  boldText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'sans-serif-medium'
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey
  },
  darkGreyText: {
    color: colors.darkGrey
  }
})

const Touchable = (props) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity>
        <View style={styles.button}>
          {props.children}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(colors.grey, false)}
    >
      <View style={styles.button}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  )
}


const mapPropsToButtons = ({ text, onPress }, index) =>
  <Touchable
    key={index}
    onPress={onPress}
  >
    <Text style={styles.text}>{text}</Text>
  </Touchable>;

export default function DrawerNavigationView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={props.profile_pic || require('../assets/drawable-xxhdpi/blank_avatar.png')}
          style={styles.profilePic}
        />
        <Text style={styles.text}>
          Dr. Zane Symonds
        </Text>
        <Text style={[
          styles.text, styles.phoneNumber
        ]}>
          +91 999999999
        </Text>
      </View>
      <View style={styles.navigationContainer}>
        <View style={styles.button}>
          <Text style={[styles.text, styles.darkGreyText]}>
            SPECIALITY
          </Text>
        </View>
        <Touchable>
          <Text style={[styles.text, styles.blackText, styles.boldText]}>
            General Physician
          </Text>
        </Touchable>
        <Touchable>
          <Text style={[styles.text, styles.blackText, styles.boldText]}>
            Heart Specialist
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={[styles.text, styles.blackText]}>
            Spam
          </Text>
        </Touchable>
        <Touchable>
          <Text style={[styles.text, styles.blackText]}>
            Change Password
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={[styles.text, styles.blackText]}>
            About Us
          </Text>
        </Touchable>
        <Touchable>
          <Text style={[styles.text, styles.blackText]}>
            Contact Us
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={[styles.text, styles.blackText]}>
            Signout
          </Text>
        </Touchable>
      </View>
    </View>
  );
}
