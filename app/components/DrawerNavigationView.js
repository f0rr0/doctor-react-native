/**
 * @providesModule DrawerNavigationView
 */

import React, { PropTypes } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import colors from 'colors';

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
    color: colors.black,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 14,
    lineHeight: 21
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
  divider: {
    height: 1,
    backgroundColor: colors.grey
  },
  whiteText: {
    color: colors.white
  },
  darkGreyText: {
    color: colors.darkGrey
  },
  turquoiseText: {
    color: colors.turquoise
  },
  boldText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'sans-serif-medium'
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
      background={TouchableNativeFeedback.Ripple(colors.darkGrey, false)}
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
        <Text
          style={[
            styles.text, styles.boldText, styles.whiteText
          ]}
        >
          Dr. Zane Symonds
        </Text>
        <Text
          style={[
            styles.text, styles.whiteText
          ]}
        >
          +91 999999999
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.navigationContainer}>
        <View style={styles.button}>
          <Text
            style={[
              styles.text, styles.darkGreyText
            ]}
          >
            SPECIALITY
          </Text>
        </View>
        <Touchable>
          <Text
            style={[
              styles.text, styles.turquoiseText, styles.boldText
            ]}
          >
            Skin Specialist
          </Text>
        </Touchable>
        <Touchable>
          <Text
            style={[
              styles.text, styles.boldText
            ]}
          >
            General Physician
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={styles.text}>
            Spam
          </Text>
        </Touchable>
        <Touchable>
          <Text style={styles.text}>
            Change Password
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={styles.text}>
            About Us
          </Text>
        </Touchable>
        <Touchable>
          <Text style={styles.text}>
            Contact Us
          </Text>
        </Touchable>
        <View style={styles.divider} />
        <Touchable>
          <Text style={styles.text}>
            Signout
          </Text>
        </Touchable>
      </ScrollView>
    </View>
  );
}
