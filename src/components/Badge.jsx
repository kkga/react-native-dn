import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import badgeColors from '../styles/badgeColors';

class Badge extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  getColors() {
    const badge = badgeColors[this.props.type];
    const colors = { text: badge.text, bg: badge.bg };

    return colors;
  }

  render() {
    const colors = this.getColors();

    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={[styles.text, { color: colors.text }]}>
          {this.props.type.toUpperCase()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default Badge;
