import React, {
  Component,
  TabBarIOS,
} from 'react-native';

import List from './List';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topStories',
    };
  }

  renderTab(storiesType) {
    return (
      <List storiesType={storiesType} />
    );
  }

  render() {
    return (
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
          }}
        >
          {this.renderTab('topStories')}
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
          }}
        >
          {this.renderTab('recentStories')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default Home;
