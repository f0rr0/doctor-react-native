/**
 * @providesModule ConversationList
 */

import React, { Component } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import deepEqual from 'deep-equal';
import ConversationRow from 'ConversationRow';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.grey
  },
  full: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const LoadingView = () => (
  <View style={styles.full}>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'large' : 65}
      color={colors.turquoise}
    />
  </View>
);

const NoData = () => (
  <View style={styles.full}>
    <Text>No consultations found</Text>
  </View>
);

@connect(null)
export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  }

  componentDidMount() {
    const { dispatch, conversations, category, active } = this.props;
    if (!!!conversations.loading) {
      dispatch(actions.GET_CONVERSATIONS(category));
    }
  }

  shouldComponentUpdate(nextProps) {
    return !deepEqual(nextProps.conversations, this.props.conversations);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, category, speciality } = this.props;
    if (nextProps.speciality !== speciality) {
      dispatch(actions.GET_CONVERSATIONS(category));
    } else if (!this.props.active && nextProps.active && !!!nextProps.conversations.loading && !!!this.props.conversations.loading) {
      dispatch(actions.GET_CONVERSATIONS(category));
    }
  }

  renderSeparator = (sectionID, rowID) =>
    <View key={rowID} style={styles.separator} />

  renderRow = (rowData, sectionID, rowID) =>
    <ConversationRow key={rowID} conversation={rowData} rowID={rowID} />;

  renderRefreshControl = () =>
    <RefreshControl
      refreshing={!!this.props.conversations.refreshing}
      onRefresh={this.onRefresh}
      colors={[colors.turquoise]}
      tintColor={colors.turquoise}
    />

  onRefresh = () => {
    const { dispatch, category, conversations } = this.props;
    if (!!!conversations.loading && !!!conversations.refreshing) {
      dispatch(actions.REFRESH_CONVERSATIONS(category));
    }
  }

  onEndReached = () => {
    console.log('load more')
  }

  render() {
    const { conversations } = this.props;
    const { conversations: data = [] } = conversations;
    if (conversations.loading) {
      return <LoadingView />;
    } else if (data.length > 0) {
      const dataSource = this.ds.cloneWithRows(data);
      return(
        <ListView
          showsVerticalScrollIndicator={false}
          initialListSize={6}
          onEndReachedThreshold={100}
          enableEmptySections={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          refreshControl={this.renderRefreshControl()}
          onEndReached={this.onEndReached}
        />
      );
    }
    return <NoData />;
  }
}
