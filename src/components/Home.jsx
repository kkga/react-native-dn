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
            title="Top"
            icon={require('../img/top.png')}
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
            title="Recent"
            icon={require('../img/recent.png')}
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
            title="You"
            icon={require('../img/you.png')}
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
