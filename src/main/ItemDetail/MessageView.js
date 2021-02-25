import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import theme from '../../common/theme';

const List = ({ message }) => (
  <View style={{ flex: 1 }}>
    <Text>{message}</Text>
  </View>
);

List.propTypes = {
  message: PropTypes.string.isRequired
};

const MessageView = () => (
  <ScrollableTabView
    style={{ flex: 1, height: 300 }}
    tabBarBackgroundColor="white"
    tabBarActiveTextColor={theme.color}
    tabBarTextStyle={{ fontSize: 14, marginTop: 13 }}
    tabBarUnderlineStyle={{ backgroundColor: theme.color }}
    initialPage={0}>
    {['Product Detail', 'Feature', 'Warranty'].map(v => (
      <List tabLabel={v} message={v} key={v} />
    ))}
  </ScrollableTabView>
);

export default MessageView;
