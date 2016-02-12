import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// import moment from 'moment';
import Badge from './Badge.js';

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

  // renderThumbnail() {
  //   if (this.props.url) {
  //     return (
  //       <Image
  //         source={{ uri: this.state.imageUrl }}
  //         style={{ width: 60, height: 60, borderRadius: 5 }}
  //       />
  //     );
  //   }
  // }

  render() {
    // const date = new Date(this.props.created_at);
    // const faviconUrl = 'http://icons.better-idea.org/icon?url=' + this.props.hostname + '&size=28';
    const hasBadge = this.props.badge;

    return (
      <TouchableOpacity onPress={this.props.onPress}>

        <View style={styles.container}>

          <View style={styles.header}>
            {hasBadge &&
              <Badge type={this.props.badge} />
            }

            {this.props.hostname &&
              <View style={styles.source}>
                {/* <Image style={styles.favicon} source={{ uri: faviconUrl }} /> */}
                <Text style={styles.hostname}>{this.props.hostname}</Text>
              </View>
            }
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.vote}>
              <Image style={styles.voteImg} source={require('../img/upvote.png')} />
              <Text style={styles.voteCount}>
                {this.props.vote_count}
              </Text>
            </View>
            <View style={styles.comments}>
              <Text style={styles.commentsText}>{this.props.comment_count} comments</Text>
            </View>

            {/* <View style={styles.meta}>
              <Text>{moment(date).fromNow()}</Text>
            </View> */}
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  header: {
    flexDirection: 'row',
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // favicon: {
  //   width: 14,
  //   height: 14,
  //   marginRight: 4,
  // },
  hostname: {
    fontSize: 13,
    opacity: 0.6,
  },

  body: {
    marginTop: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteCount: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
    color: '#2D72D9',
  },
  comments: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: '#EFEFEF',
  },
  commentsText: {
    fontSize: 13,
    opacity: 0.7,
  },

});

export default Story;
