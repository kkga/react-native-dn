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
    var topStory = this.props.vote_count > 10;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.voteContainer}>
            <View style={topStory ? styles.voteLabelTop : styles.voteLabel}>
              <Text style={styles.voteCount}>
                {this.props.vote_count}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.props.title}</Text>

            <View style={styles.meta}>
              {this.props.hostname &&
                <Text style={styles.source}>{this.props.hostname.toUpperCase()}</Text>
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  voteContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 7,
  },
  voteLabel: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 3,
    width: 28,
    backgroundColor: '#EFEFEF'
  },
  voteLabelTop: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 3,
    width: 28,
    backgroundColor: 'green'
  },
  voteCount: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.65,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    opacity: 0.5,
  },
  source: {
    fontSize: 10,
    fontWeight: '500',
  }
});

module.exports = Story;
