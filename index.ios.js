'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
} from 'react-native';

import List from './App/Components/List';
import Details from './App/Components/Details';

class App extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'List':
        return <List navigator={navigator} />;
      case 'Details':
        return <Details navigator={navigator} url={route.url} />;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'List', index: 0}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={this.renderScene}
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('wtf', () => App);
