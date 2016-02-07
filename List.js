'use strict';
import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

const REQUEST_URL = 'https://www.designernews.co/api/v2/stories';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    };
    this.renderPost = this.renderPost.bind(this);
  }

  renderPost(post) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigator.push({
            name: 'Details',
            url: post.url,
          });
        }}
        style={styles.row}>
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.votes}>{post.vote_count}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPost}
        style={styles.listView}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
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
      <View style={styles.container}>
        <ActivityIndicatorIOS size="large"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = List;
