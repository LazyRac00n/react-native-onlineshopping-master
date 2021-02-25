import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-easy-toast';
import theme from '../../common/theme';
import { width } from '../../common/screen';

@inject('rootStore')
@observer
export default class CartCheckOut extends Component {
  state = {
    visible: false,
    loadText: 'Paying...'
  };

  toastRef = React.createRef();

  @computed get CartStore() {
    const { rootStore } = this.props;
    return rootStore.CartStore;
  }

  @computed get OrderStore() {
    const { rootStore } = this.props;
    return rootStore.OrderStore;
  }

  // all select
  allSelect = () => {
    const { isAllSelected } = this.CartStore;
    if (isAllSelected) {
      this.CartStore.foodList.forEach(e => {
        e.isSelected = false;
      });
    } else {
      this.CartStore.foodList.forEach(e => {
        e.isSelected = true;
      });
    }
  };

  // checkout
  pay = () => {
    Alert.alert(
      'Hello',
      `Total amount:￥ ${this.CartStore.totalMoney}`,
      [
        { text: 'Comfirm to buy', onPress: this.clear },
        { text: 'next time', onPress: () => null }
      ],
      { cancelable: false }
    );
  };

  // clean the cart
  clear = () => {
    this.setState({
      visible: true
    });
    const checkOut = () =>
      new Promise(res => {
        setTimeout(() => {
          this.setState({
            loadText: 'Successful'
          });
          res();
        }, 2000);
      });
    const afterPayOut = async () => {
      await checkOut();
      setTimeout(() => {
        this.setState({
          visible: false
        });
        // save data to order
        const orderData = {};
        orderData.date = new Date();
        orderData.totalMoney = this.CartStore.totalMoney;
        orderData.data = [];
        this.CartStore.foodList.forEach(e => {
          if (e.isSelected) {
            orderData.data.push(e);
          }
        });
        this.OrderStore.allDatas.push(orderData);
        // clean cart
        this.CartStore.foodList = [];
      }, 1500);
    };
    afterPayOut();
  };

  render() {
    const { visible, loadText } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.allSelect}>
          <Image
            source={
              this.CartStore.isAllSelected
                ? require('../../img/radio_selected.png')
                : require('../../img/radio_normall.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.right}>
          <Text style={{ flex: 1, marginLeft: 5, fontSize: 16 }}>SelectAll</Text>
          <Text style={{ fontSize: 22, color: '#000' }}>
            $ {this.CartStore.totalMoney}
          </Text>
        </View>

        <TouchableOpacity
          style={{ paddingLeft: 15, paddingRight: 15, alignItems: 'center' }}
          onPress={this.pay}>
          <Text style={{ fontSize: 16 }}>checkout</Text>
        </TouchableOpacity>
        <Spinner
          visible={visible}
          textContent={loadText}
          textStyle={{ fontSize: 15, color: '#FFF' }}
        />
        <Toast
          ref={this.toastRef}
          positionValue={200}
          fadeInDuration={650}
          fadeOutDuration={600}
          opacity={0.8}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.color
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

CartCheckOut.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};
