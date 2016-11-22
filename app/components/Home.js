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
import { startCase } from 'lodash-es';
import AppBar from 'AppBar';
import Drawer from 'Drawer';
import TabView from 'react-native-scrollable-tab-view';
import ConversationList from 'ConversationList';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: colors.white
  },
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

@connect(({ conversations, speciality }) => ({ conversations, speciality }))
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    }
    this.tabs = ["new", "follow_up", "all"];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.CLEAR_ROUTE_STACK('home'));
  }

  openDrawer = () => {
    this._drawer.open();
  }

  onChangeTab = ({ i }) => {
    this.setState({
      selectedTab: i
    });
  }

  render() {
    const { conversations, speciality, category } = this.props;
    const { selectedTab } = this.state;
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
          onChangeTab={this.onChangeTab}
          onScroll={this.onScroll}
        >
          {this.tabs.map((label, index) =>
            <View
              key={index}
              tabLabel={startCase(label).toUpperCase()}
              style={styles.full}
            >
              <ConversationList
                active={selectedTab === index}
                speciality={speciality}
                category={label}
                conversations={conversations[label]}
              />
            </View>
          )}
        </TabView>
      </Drawer>
    );
  }
}
