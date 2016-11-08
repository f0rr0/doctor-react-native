/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import styled from 'styled-components/native';
import Drawer from 'react-native-drawer';
import ActionBar from 'react-native-action-bar';
import TabView from 'react-native-scrollable-tab-view';

const InsideDrawerView = styled(View)`
  background-color: palevioletred;
  flex: 1;
`;

const OutsideDrawerView = styled(View)`
  background-color: papayawhip;
`;

export default class doctorApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'new'
    }
  }
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        type="overlay"
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        content={<InsideDrawerView><Text>Drawer Contents</Text></InsideDrawerView>}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3
          },
          main: {
            paddingLeft: 3
          },
        }}
      >
        <ActionBar
          backgroundColor={'#042430'}
          leftIconName={'menu'}
          leftIconStyle={{
            tintColor: '#0bc5d8',
            marginBottom: 6
          }}
          onLeftPress={this.openControlPanel}
          title={'Consultation'}
          style={{
            height: 56
          }}
          titleStyle={{
            fontFamily: 'sans-serif-light',
            fontSize: 20,
            textAlign: 'left',
            marginLeft: -25
          }}
        />
        <TabView
          tabBarBackgroundColor="#042430"
          tabBarActiveTextColor="#FFFFFF"
          tabBarInactiveTextColor="#777777"
          tabBarUnderlineStyle={{
            backgroundColor: '#0bc5d8'
          }}
          tabBarTextStyle={{
            paddingTop: 19,
            paddingBottom: 19,
            fontFamily: 'Roboto',
            fontSize: 15
          }}
        >
          <OutsideDrawerView tabLabel="NEW" />
          <OutsideDrawerView tabLabel="FOLLOW UP" />
          <OutsideDrawerView tabLabel="ALL" />
        </TabView>
      </Drawer>
    );
  }
}

AppRegistry.registerComponent('doctorApp', () => doctorApp);
