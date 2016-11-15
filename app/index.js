import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styled from 'styled-components/native';
import Drawer from 'react-native-drawer';
import TabView from 'react-native-scrollable-tab-view';
import ActionBar from './components/AppBar';

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
    console.log('touch');
    this._drawer.open();
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        tapToClose={true}
        type="overlay"
        elevation={10}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        content={<InsideDrawerView><Text>Drawer Contents</Text></InsideDrawerView>}
        tweenHandler={(ratio) => ({
          main: {
            opacity: (2 - ratio) / 2
          }
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
          title="Consultations"
          leftTouchButton={[{
            icon: require('./assets/drawable-xxhdpi/nav_icon.png'),
            onPress: this.openControlPanel,
            style: {
              height: 12,
              width: 16,
            }
          }]}
          rightTouchButtons={[
            {
              icon: require('./assets/drawable-xxhdpi/flag_icon.png'),
              onPress: this.openControlPanel,
              style: {
                height: 18,
                width: 14
              }
            }
          ]}
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
          <OutsideDrawerView tabLabel="NEW" />
          <OutsideDrawerView tabLabel="FOLLOW UP" />
          <OutsideDrawerView tabLabel="ALL" />
        </TabView>
      </Drawer>
    );
  }
}
