import React, {
  Component,
  PropTypes,
  ListView,
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  RefreshControl,
} from 'react-native';

import ListItem from './ListItem';
import api from '../api';

class List extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    storiesType: PropTypes.oneOf(['topStories', 'recentStories']),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.renderRow = this.renderRow.bind(this);
    this.onRowPress = this.onRowPress.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onRowPress(rowData) {
    this.props.navigator.push({
      name: 'Viewer',
      url: rowData.url,
    });
  }

  onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    this.fetchData();
  }

  generateRequestUrl(storiesType) {
    if (storiesType === 'topStories') {
      return api.DN_TOP;
    }
    return api.DN_RECENT;
  }

  fetchData() {
    const requestUrl = this.generateRequestUrl(this.props.storiesType);

    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
          isLoading: false,
          isRefreshing: false,
        });
      })
      .catch((error) => { console.warn(error); })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS size="large"/>
      </View>
    );
  }

  renderSeparator(rowData, rowID) {
    return (
      <View key={'SEP_' + rowID} style={styles.separator} />
    );
  }

  renderRow(rowData, rowID) {
    return (
      <ListItem
        hostname={rowData.hostname}
        title={rowData.title}
        key={rowID}
        user={rowData.links.user}
        url={rowData.url}
        vote_count={rowData.vote_count}
        badge={rowData.badge}
        created_at={rowData.created_at}
        comment_count={rowData.comment_count}
        onPress={() => this.onRowPress(rowData)}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="#ff0000"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
});

export default List;
