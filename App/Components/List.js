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

import Story from './Story';

import api from '../api.js';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: true,
    };
    this.renderStory = this.renderStory.bind(this);
  }

  renderStory(story) {
    return (
      <Story
        title={story.title}
        hostname={story.hostname}
        vote_count={story.vote_count}
        onPress={() => {
          this.props.navigator.push({
            name: 'Details',
            url: story.url,
          });
        }}
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
          renderRow={this.renderStory}
          style={styles.listView}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
      </View>
    );
  }

  componentDidMount() {
    this.fetchData();
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
}

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  listView: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#EFEFEF',
  }
});

module.exports = List;
