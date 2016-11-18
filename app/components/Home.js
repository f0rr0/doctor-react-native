/**
 * @providesModule Home
 */

import React, { Component } from 'react';
import { Text, StatusBar, View } from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import actions from 'actions';
import Drawer from 'Drawer';
import TabView from 'react-native-scrollable-tab-view';
import AppBar from 'AppBar';
import colors from 'colors';

class Home extends Component {
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
          tabBarBackgroundColor="#042430"
          tabBarActiveTextColor="#FFFFFF"
          tabBarInactiveTextColor="#777777"
          tabBarUnderlineStyle={{
            backgroundColor: '#0bc5d8',
            height: 3
          }}
          tabBarTextStyle={{
            paddingTop: 16,
            // fontFamily: 'Roboto',
            fontSize: 15
          }}
        >
          <View tabLabel="NEW" />
          <View tabLabel="FOLLOW UP" />
          <View tabLabel="ALL" />
        </TabView>
      </Drawer>
    );
  }
}

export default connect(null)(Home);

Home.route = {
  styles: {
    ...NavigationStyles.SlideHorizontal,
    gestures: null
  }
};
