/**
 * @providesModule ConversationList
 */

import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Text,
  StyleSheet
} from 'react-native';
import ConversationRow from 'ConversationRow';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.grey
  }
});

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi']),
      refreshing: false
    };
  }

  renderSeparator = (sectionID, rowID) =>
    <View key={rowID} style={styles.separator} />;

  renderRow = (rowData, sectionID, rowID) =>
    <ConversationRow key={rowID} user={rowData} rowID={rowID} />;

  renderRefreshControl = () =>
    <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      colors={[colors.turquoise]}
      tintColor={colors.turquoise}
    />;

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 2000);
  };

  onEndReached = () => {
    console.log('load more')
  };

  render() {
    return(
      <ListView
        // showsVerticalScrollIndicator={false}
        initialListSize={6}
        onEndReachedThreshold={10}
        enableEmptySections={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        refreshControl={this.renderRefreshControl()}
        onEndReached={this.onEndReached}
      />
    );
  }
}
