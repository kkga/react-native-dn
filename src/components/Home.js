import React, {
  Component,
  TabBarIOS,
  PropTypes,
  View,
  StyleSheet,
} from 'react-native';

import List from './List';

class Home extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topStories',
    };
  }

  renderTab(storiesType) {
    return (
      <List
        navigator={this.props.navigator}
        storiesType={storiesType}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          tintColor="#276FDC"
          barTintColor="white"
        >
          <TabBarIOS.Item
            title="Top Stories"
            icon={require('../img/top.png')}
            selectedIcon={require('../img/top-selected.png')}
            selected={this.state.selectedTab === 'topStories'}
            onPress={() => {
              this.setState({
                selectedTab: 'topStories',
              });
            }}
          >
            {this.renderTab('topStories')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Recent Stories"
            icon={require('../img/recent.png')}
            selectedIcon={require('../img/recent-selected.png')}
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'recentStories'}
            onPress={() => {
              this.setState({
                selectedTab: 'recentStories',
              });
            }}
          >
            {this.renderTab('recentStories')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Discussions"
            icon={require('../img/discussions.png')}
            selectedIcon={require('../img/discussions-selected.png')}
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'discussions'}
            onPress={() => {
              this.setState({
                selectedTab: 'discussions',
              });
            }}
          >
            {this.renderTab('recentStories')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="You"
            icon={require('../img/you.png')}
            selectedIcon={require('../img/you-selected.png')}
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'you'}
            onPress={() => {
              this.setState({
                selectedTab: 'you',
              });
            }}
          >
            {this.renderTab('recentStories')}
          </TabBarIOS.Item>
        </TabBarIOS>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default Home;
