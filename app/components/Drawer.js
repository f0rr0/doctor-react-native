/**
 * @providesModule Drawer
 */

import React, { PropTypes, PureComponent } from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import DrawerNavigationView from 'DrawerNavigationView';

export default class Drawer extends PureComponent {
  open = () => {
    this._drawer.openDrawer();
  }
  close = () => {
    this._drawer.closeDrawer();
  }
  render() {
    const { width } = Dimensions.get('window');
    return (
      <DrawerLayout
        ref={(ref) => this._drawer = ref}
        drawerWidth={width * 0.843}
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
        renderNavigationView={() => <DrawerNavigationView {...this.props} close={this.close} />}
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
