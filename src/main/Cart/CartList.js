import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { observer } from 'mobx-react';
import { action } from 'mobx';

@observer
export default class CartList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    CartStore: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    const { CartStore, data } = this.props;
    this.CartStore = CartStore;
    this.data = data;
  }

  // checkbox-onPress
  @action
  checkSelected = () => {
    this.data.isSelected = !this.data.isSelected;
  };

  // + onPress
  @action
  add = () => {
    this.data.count += 1;
  };

  // - onPress
  @action
  reduce = () => {
    if (this.data.count === 0) return;
    this.data.count -= 1;
  };
  @action
  delete = name => {
    this.CartStore.delete(name);
  };

  render() {
    const { name, price, count, image, isSelected } = this.data;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={this.checkSelected}>
          <Image
            source={
              /* eslint-disable */
              isSelected
                ? require('../../img/radio_selected.png')
                : require('../../img/radio_normall.png')
            }
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Image source={image} style={styles.image} />
        <View style={styles.rightView}>
          <View style={styles.topView}>
            <Text style={[styles.text, { flex: 1, textAlign: 'center' }]}>
              {name}
            </Text>
            <Text style={[styles.text, { flex: 1, textAlign: 'center' }]}>
              $ {price}
            </Text>
          </View>

          <View style={styles.bottomView}>
            <TouchableOpacity
              style={{ paddingLeft: 10, paddingRight: 30 }}
              onPress={this.reduce}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{count}</Text>
            <TouchableOpacity
              style={{ paddingLeft: 30, paddingRight: 10 }}
              onPress={this.add}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 45 }}
              onPress={() => this.delete(name)}>
              <Text style={styles.text}>delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 130,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 18,
    marginRight: 10
  },
  rightView: {
    flex: 1,
    height: 100
    // justifyContent: 'space-between'
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  text: {
    color: '#000',
    fontSize: 15
  },
  bottomView: {
    flexDirection: 'row'
  },
  button: {
    paddingLeft: 30,
    paddingRight: 30
  }
});
