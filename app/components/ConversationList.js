/**
 * @providesModule ConversationList
 */

import React, { PureComponent } from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import ConversationRow from 'ConversationRow';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  separator: {
    height: 2 * StyleSheet.hairlineWidth,
    backgroundColor: colors.grey
  },
  full: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: colors.turquoise,
    margin: 10
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

const ErrorData = ({ onPress }) => (
  <View style={styles.full}>
    <Text>Something went wrong</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.errorText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

@connect(null)
export default class ConversationList extends PureComponent {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
  }

  componentDidMount() {
    const { dispatch, conversations, category, active } = this.props;
    if (!conversations.loading) {
      dispatch(actions.GET_CONVERSATIONS(category));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, category, speciality, conversations, active } = this.props;
    if (nextProps.speciality !== speciality) {
      dispatch(actions.GET_CONVERSATIONS(category));
    } else if (!active && nextProps.active && !nextProps.conversations.loading && !conversations.loading) {
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
    if (!conversations.loading && !conversations.refreshing) {
      dispatch(actions.REFRESH_CONVERSATIONS(category));
    }
  }

  onEndReached = () => {
    const { conversations, dispatch, category } = this.props;
    const { conversations: data = [] } = conversations;
    const pgn = (data.length / 6) + 1;
    if (conversations.has_more) {
      dispatch(actions.LOAD_MORE_CONVERSATIONS(category, pgn));
    }
  }

  onTryAgain = () => {
    const { dispatch, category, conversations } = this.props;
    if (!conversations.loading && !conversations.refreshing) {
      dispatch(actions.GET_CONVERSATIONS(category));
    }
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
          onEndReachedThreshold={50}
          enableEmptySections={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          refreshControl={this.renderRefreshControl()}
          onEndReached={this.onEndReached}
        />
      );
    } else if (conversations.error) {
      return <ErrorData onPress={this.onTryAgain} />;
    }
    return <NoData />;
  }
}
