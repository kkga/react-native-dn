'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          url={this.state.url}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  webview: {
    height: 350
  },
});

module.exports = Details;
