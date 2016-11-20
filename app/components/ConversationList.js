/**
 * @providesModule ConversationList
 */

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet
} from 'react-native';
import ConversationRow from 'ConversationRow';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: colors.grey
  }
});

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi', 'Gaurav', 'Sunit', 'Himanshu', 'Siddharth', 'Ronak', 'Shubhangi']),
    };
  }

  renderSeparator = (sectionID, rowID) => <View key={rowID} style={styles.separator} />

  renderRow = (rowData, sectionID, rowID) => <ConversationRow key={rowID} user={rowData} rowID={rowID} />

  onEndReached = () => {
    console.log('load more')
  }

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
        onEndReached={this.onEndReached}
      />
    );
  }
}
