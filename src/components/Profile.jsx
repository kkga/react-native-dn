import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

class Profile extends Component {
  constructor(props) {
  super(props);

  this.promptResponse = this.promptResponse.bind(this);
  this.state = {
    promptValue: undefined,
  };

  this.title = 'Type a value';
  this.defaultValue = 'Default value';
  this.buttons = [{
    text: 'Custom OK',
    onPress: this.promptResponse
  }, {
    text: 'Custom Cancel',
    style: 'cancel',
  }];
  }

  prompt() {
    // Flow's apply support is broken: #7035621
    ((AlertIOS.prompt: any).apply: any)(AlertIOS, arguments);
  }

  promptResponse(promptValue) {
    this.setState({ promptValue });
  }

  render() {
    return (
      <View style={styles.container}>

      <TouchableHighlight
          style={styles.wrapper}
          onPress={this.prompt.bind(this, this.title, this.defaultValue, null, this.promptResponse)}>

          <View style={styles.button}>
            <Text>
              prompt with title, default value & callback
            </Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Profile;
