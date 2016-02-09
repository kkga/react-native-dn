import React, {
  Component,
  PropTypes,
  ListView,
  StyleSheet,
  View,
  ActivityIndicatorIOS,
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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    };
    this.renderRow = this.renderRow.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onPress(rowData) {
    this.props.navigator.push({
      name: 'Details',
      url: rowData.url,
    });
  }

  fetchData() {
    fetch(api.DN_STORIES)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
          loading: false,
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

  renderSeparator() {
    return (
      <View style={styles.separator} />
    );
  }

  renderRow(rowData) {
    return (
      <Story
        hostname={rowData.hostname}
        title={rowData.title}
        vote_count={rowData.vote_count}
        onPress={() => this.onPress(rowData)}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
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
