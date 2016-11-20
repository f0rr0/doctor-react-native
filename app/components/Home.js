/**
 * @providesModule Home
 */

import React, { Component } from 'react';
import {
  Text,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import actions from 'actions';
import Drawer from 'Drawer';
import TabView from 'react-native-scrollable-tab-view';
import ConversationList from 'ConversationList';
import AppBar from 'AppBar';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: colors.turquoise,
    height: 4
  },
  tabBarTextStyle: {
    paddingTop: 16,
    fontSize: 15,
    fontFamily: fonts.medium
  }
});

@connect(null)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'new'
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.CLEAR_ROUTE_STACK('home'));
  }

  openDrawer = () => {
    this._drawer.open();
  }

  render() {
    return (
      <Drawer ref={(ref) => { this._drawer = ref; }}>
        <StatusBar
          backgroundColor={colors.gunmetal}
          barStyle="light-content"
        />
        <AppBar
          title="Consultations"
          leftTouchButtons={[{
            icon: require('../assets/drawable-xxhdpi/nav_icon.png'),
            onPress: this.openDrawer,
            style: {
              height: 12,
              width: 16
            }
          }]}
        />
        <TabView
          tabBarBackgroundColor={colors.gunmetal}
          tabBarActiveTextColor={colors.white}
          tabBarInactiveTextColor={colors.darkGrey}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          tabBarTextStyle={styles.tabBarTextStyle}
        >
          <View tabLabel="NEW">
            <ConversationList />
          </View>
          <View tabLabel="FOLLOW UP" />
          <View tabLabel="ALL" />
        </TabView>
      </Drawer>
    );
  }
}
