'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class Story extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={this.props.onPress}>
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.votes}>{this.props.vote_count}</Text>
          <Text style={styles.hostname}>{this.props.hostname}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
  },
});

module.exports = Story;
