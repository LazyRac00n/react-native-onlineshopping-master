import React, { Component } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import ThemeLine from '../Home/Navigator';
import NewGoodsView from '../Home/recomView';
import Disturb from '../../common/disturbArray';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  }
});

export default class CategoryListView extends Component {
  static defaultProps = {
    itemDatas: []
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    itemDatas: PropTypes.array
  }

  state = (() => {
    const { itemDatas } = this.props;
    return {
      isRefreshing: false,
      itemDatas
    };
  })()

  onRefresh = () => {
    this.setState({
      isRefreshing: true
    });
    setOut(() => {
      const { itemDatas } = this.state;
      const newDatas = Disturb([...itemDatas, ...itemDatas]);
      this.setState({
        isRefreshing: false,
        itemDatas: newDatas
      });
    }, 1000);
  }

  render() {
    const { isRefreshing, itemDatas } = this.state;
    const { navigation } = this.props;
    const RefreshCon = (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={this.onRefresh}
        tintColor="#000000"
        title="loading"
        colors={['#000000']}
        progressBackgroundColor="#ffffff"
        enabled
      />
    );
    return (
      <ScrollView
        refreshControl={RefreshCon}
        style={styles.container}>
        <ThemeLine name="New" />
        <NewGoodsView
          itemDatas={itemDatas}
          navigation={navigation}
        />
      </ScrollView>
    );
  }
}
