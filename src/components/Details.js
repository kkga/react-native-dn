import React, {
  Component,
  PropTypes,
  StyleSheet,
  View,
  WebView,
  TouchableOpacity,
  Text,
  ActionSheetIOS,
} from 'react-native';

class Details extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigator.pop();
  }

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://code.facebook.com',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
      ],
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      let text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      console.log(text);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          startInLoadingState
          url={this.props.url}
          style={styles.webview}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.action}>{'<'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.showShareActionSheet}>
            <Text style={styles.action}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  webview: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    height: 30,
    padding: 10,
  },
  action: {
    color: '#fff',

  }
});


export default Details;
