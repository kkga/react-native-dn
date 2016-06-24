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
      token: undefined,
    };

    this.myInfo = this.myInfo.bind(this);

    this.title = 'Type a value';
    this.defaultValue = 'Default value';
    this.buttons = [{
      text: 'Custom OK',
      onPress: this.promptResponse,
    }, {
      text: 'Custom Cancel',
      style: 'cancel',
    }];
  }

  prompt() {
    ((AlertIOS.prompt: any).apply: any)(AlertIOS, arguments);
  }

  promptResponse(promptValue) {
    this.setState({ promptValue });
  }

  componentDidMount() {
    this.getToken();
    // this.myInfo();
  }

  getToken() {
    const requestObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: '576c722a2fd70d15a7a3e07d54c49181d2e4e060361590119a0a74be80396972',
        client_secret: 'c087d9e638de92dbfb17166186b838b302a698fafc13deac465c5bbf4ba190a5',
        grant_type: 'client_credentials',
      }),
    };

    return fetch('https://www.designernews.co/oauth/token', requestObj)
      .then((res) => res.json())
      .then((responseData) => {
        this.setState({
          token: responseData.access_token,
        });
      });
  }

  myInfo() {
    const requestUrl = 'https://www.designernews.co/api/v2/me';
    const token = this.state.token;
    const requestObj = {
      headers: {
        Authorization: 'bearer ' + token,
      },
    };

    fetch(requestUrl, requestObj)
      .then((response) => response.json())
      .then((responseData) => console.log(responseData))
      .catch((error) => { console.warn(error); })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableHighlight
          style={styles.wrapper}
          onPress={
            this.prompt.bind(this, this.title, this.defaultValue, null, this.promptResponse)
          }
        >

          <View style={styles.button}>
            <Text onPress={this.myInfo}>
              get my info
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
