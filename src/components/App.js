import React, {
  Component,
  Navigator,
  StyleSheet,
} from 'react-native';

import List from './List.js';
import Details from './Details.js';

class App extends Component {

  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene(route, navigator) {
    switch (route.name) {
      default:
      case 'List':
        return <List navigator={navigator} />;
      case 'Details':
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
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'List', index: 0 }}
        renderScene={this.renderScene}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

module.exports = App;
