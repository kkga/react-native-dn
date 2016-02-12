import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

class Story extends Component {

  static propTypes = {
    hostname: PropTypes.string,
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
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage() {
    const readabilityAPI = 'https://readability.com/api/content/v1/';
    const readabilityToken = 'b39e302e54e5e3dcfe3e3e721e8012e5d882cbdb';
    const url = this.props.url;
    const requestUrl = readabilityAPI + 'parser?url=' + url + '&token=' + readabilityToken;

    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          imageUrl: responseData.lead_image_url,
        });
      });
  }

  render() {
    const topStory = this.props.vote_count > 50;
    const date = new Date(this.props.created_at);
    const imageUrl = this.state.imageUrl;

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
                <Text style={styles.source}>{this.props.hostname.toUpperCase()}</Text>
              }
            </View>
            <Text style={styles.title}>{this.props.title}</Text>

            <View style={styles.meta}>
              <Text>{date.toDateString()}</Text>
              <Text>{this.props.comment_count} comments</Text>
            </View>
          </View>

          <Image
            source={{ uri: imageUrl }}
            style={{ width: 100, height: 100 }}
          />
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
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 6,
  },
  meta: {
    flexDirection: 'row',
    opacity: 0.5,
  },
  source: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default Story;
