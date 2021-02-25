import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import OrderList from './OrderList';

@inject('rootStore')
@observer
export default class OrderScreen extends Component {
  static navigationOptions = {
    headerRight: <View />
  };

  @computed get OrderData() {
    const { rootStore } = this.props;
    const { OrderStore } = rootStore;
    return OrderStore.allDatas;
  }

  renderItem = ({ item }) => <OrderList item={item} />;

  keyExtractor = (item, index) => `item-${index}`;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.OrderData.length ? (
          <FlatList
            data={this.OrderData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No orders~</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

OrderScreen.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
