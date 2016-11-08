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

const InsideDrawerView = styled(View)`
  background-color: palevioletred;
  flex: 1;
`;

const OutsideDrawerView = styled(View)`
  background-color: papayawhip;
`;

export default class doctorApp extends Component {
  closeControlPanel = () => {
    this._drawer.close()
  };
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
        content={<InsideDrawerView><Text>Main View</Text></InsideDrawerView>}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        styles={{
          drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3},
        }}
      >
        <ActionBar
          backgroundColor={'#3B373C'}
          leftIconName={'menu'}
          onLeftPress={this.openControlPanel}
          title={'Consultations'}
          titleStyle={{
            fontFamily: 'Cochin'
          }}
          onTitlePress={this.handleTitlePress}
        />
      </Drawer>
    );
  }
}

AppRegistry.registerComponent('doctorApp', () => doctorApp);
