import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Image,
} from 'react-native';

import moment from 'moment';

class Story extends Component {

  static propTypes = {
    hostname: PropTypes.string,
    badge: PropTypes.string,
    url: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    vote_count: PropTypes.number.isRequired,
    created_at: PropTypes.string,
    comment_count: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };
  }

  // componentDidMount() {
  //   if (this.props.url) {
  //     this.fetchImage();
  //   }
  // }
  //
  // fetchImage() {
  //   const ogAPI = 'http://opengraph.io/api/1.0/site/';
  //   const requestUrl = ogAPI + this.props.url;
  //
  //   fetch(requestUrl)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.setState({
  //         imageUrl: responseData.hybridGraph.image,
  //       });
  //     });
  // }
  //
  // renderThumbnail() {
  //   if (this.props.url) {
  //     return (
  //       <Image
  //         source={{ uri: this.state.imageUrl }}
  //         style={{ width: 80, height: 80 }}
  //       />
  //     );
  //   }
  // }

  render() {
    const topStory = this.props.vote_count > 50;
    const date = new Date(this.props.created_at);

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.voteContainer}>
            <View style={[styles.voteLabel, topStory && styles.voteLabelTop]}>
              <Text style={styles.voteCount}>
                {this.props.vote_count}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.meta}>
              {this.props.hostname &&
                <Text style={styles.source}>{this.props.hostname}</Text>
              }
            </View>
            {this.props.badge &&
              <Text style={styles.badge}>{this.props.badge.toUpperCase()}</Text>
            }
            <Text style={styles.title}>{this.props.title}</Text>

            <View style={styles.meta}>
              <Text>{this.props.comment_count} comments</Text>
              <Text>{moment(date).fromNow()}</Text>
            </View>
          </View>

          {/* {this.renderThumbnail} */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 30,
    backgroundColor: '#EFEFEF',
  },
  voteLabelTop: {
    backgroundColor: 'green',
  },
  voteCount: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.65,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 4,
  },
  badge: {
    fontSize: 14,
  },
  meta: {
    flexDirection: 'row',
    opacity: 0.5,
  },
  source: {
    fontSize: 14,
    // fontWeight: '500',
  },
});

export default Story;
