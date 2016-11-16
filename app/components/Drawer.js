/**
 * @providesModule Drawer
 */

import React, { PropTypes, Component } from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import {
  Text,
  View,
  StatusBar,
  Platform
} from 'react-native';
import DrawerNavigationView from 'DrawerNavigationView';

export default class Drawer extends Component {
  open = () => {
    this._drawer.openDrawer();
  }
  close = () => {
    this._drawer.closeDrawer();
  }
  render() {
    return (
      <DrawerLayout
        ref={(ref) => this._drawer = ref}
        drawerWidth={304}
        drawerPosition={DrawerLayout.positions.Left}
        onDrawerSlide={() => {
          if (Platform.OS === 'ios') {
            StatusBar.setHidden(true);
          }
        }}
        onDrawerClose={() => {
          if (Platform.OS === 'ios') {
            StatusBar.setHidden(false, 'slide');
          }
        }}
        renderNavigationView={() => <DrawerNavigationView {...this.props} />}
      >
        {this.props.children}
      </DrawerLayout>
    )
  }
}

Drawer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
