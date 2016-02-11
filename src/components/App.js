import React, {
  Component,
  Navigator,
  StyleSheet,
  View,
  StatusBarIOS,
} from 'react-native';

import Home from './Home';
import Details from './Details';

class App extends Component {

  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    switch (route.name) {
      default:
      case 'Home':
        StatusBarIOS.setHidden(false, 'slide');
        return <Home navigator={navigator} />;
      case 'Details':
        StatusBarIOS.setHidden(true, 'slide');
        return (
          <Details
            navigator={navigator}
            url={route.url}
          />
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          configureScene={this.configureScene}
          initialRoute={{ name: 'Home', index: 0 }}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
