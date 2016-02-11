import React, {
  Component,
  StyleSheet,
  TabBarIOS,
  View,
  Text,
} from 'react-native';

import List from './List';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topStories',
    };
  }

  renderTab() {
    return (
      <List navigator={navigator} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          tintColor="white"
          barTintColor="black">
          <TabBarIOS.Item
            systemIcon="favorites"
            title="Top Stories"
            selected={this.state.selectedTab === 'topStories'}
            onPress={() => {
              this.setState({
                selectedTab: 'topStories',
              });
            }}>
            {this.renderTab('#414A8C', 'Blue Tab')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="most-recent"
            title="Recent Stories"
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'recentStories'}
            onPress={() => {
              this.setState({
                selectedTab: 'recentStories',
              });
            }}>
            {this.renderTab('#783E33', 'Red Tab')}
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
