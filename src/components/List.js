import React, {
  Component,
  PropTypes,
  ListView,
  StyleSheet,
  View,
  Text,
  ActivityIndicatorIOS,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Story from './Story.js';
import api from '../api.js';

class List extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefreshing: false,
      requestUrl: api.DN_TOP,
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
      name: 'Details',
      url: rowData.url,
    });
  }

  onChangeSorting(sorting) {
    switch (sorting) {
      default:
      case 'top':
        this.setState({
          isLoading: true,
          requestUrl: api.DN_TOP,
        });
        this.fetchData();
        break;
      case 'recent':
        this.setState({
          isLoading: true,
          requestUrl: api.DN_RECENT,
        });
        this.fetchData();
    }
  }

  onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    this.fetchData();
  }

  fetchData() {
    fetch(this.state.requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
          isLoading: false,
          isRefreshing: false,
        });
      })
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
      <Story
        hostname={rowData.hostname}
        title={rowData.title}
        key={rowID}
        id={rowData.id}
        vote_count={rowData.vote_count}
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onChangeSorting('recent')}>
          <Text>Show Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangeSorting('top')}>
          <Text>Show Top</Text>
        </TouchableOpacity>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
});

module.exports = List;
