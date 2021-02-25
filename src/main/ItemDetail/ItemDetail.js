import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import Toast from 'react-native-easy-toast';

import theme from '../../common/theme';
import MessageView from './MessageView';

@inject('rootStore')
@observer
export default class ItemDetail extends Component {
  static navigationOptions = {
    headerRight: <View />
  };

  state = {
    num: 0,
    bounceValue: new Animated.Value(1)
  };

  toastRef = React.createRef();
  @computed get cartCount() {
    const { rootStore } = this.props;
    const { CartStore } = rootStore;
    const { foodList } = CartStore;
    return foodList.length;
  }

  addNum = () => {
    let { num } = this.state;
    this.setState({
      num: (num += 1)
    });
  };

  reduceNum = () => {
    let { num } = this.state;
    if (num <= 0) return;
    this.setState({
      num: (num -= 1)
    });
  };

  goCartPage = () => {
    const { navigation } = this.props;
    navigation.navigate('CartScreen');
  };

  addCart = value => {
    const { num, bounceValue } = this.state;
    if (num === 0) {
      this.toastRef.current.show('The value cannot be 0');
      return;
    }
    bounceValue.setValue(1.5);
    Animated.spring(
      bounceValue, 
      {
        toValue: 1,
        friction: 1 
      }
    ).start(); 

    this.updateCartScreen(value);
    this.toastRef.current.show('Success! Please go to Cart');
  };

  // update the data of cart 
  updateCartScreen(value) {
    const { num } = this.state;
    const { navigation, rootStore } = this.props;
    const { value: val } = navigation.state.params;
    const { name } = val;
    const { CartStore } = rootStore;
    const itemData = value;
    const index = CartStore.foodList.findIndex(e => e.name === name);
    if (index === -1) {
      itemData.count = 0;
      itemData.isSelected = true;
      CartStore.foodList.push(value);
      const { length } = CartStore.foodList;
      CartStore.foodList[length - 1].count += num;
    } else {
      CartStore.foodList[index].count += num;
    }
  }

  render() {
    const { num, bounceValue } = this.state;
    const { navigation } = this.props;
    const { value } = navigation.state.params;
    const { name, price, image } = value;
    const count = this.cartCount;
    const refreshCon = (
      <RefreshControl
        refreshing={false}
        tintColor="#000000"
        title="loading"
        colors={['#000000']}
        progressBackgroundColor="#ffffff"
        enabled
      />
    );
    return (
      <ScrollView style={styles.container} refreshControl={refreshCon}>
        <View style={styles.topWrapper}>
          <View style={styles.imgWrapper}>
            <Image source={image} style={styles.image} />
          </View>
          <View style={styles.chooseLine}>
            <Text style={styles.number}>value: {num}</Text>
            <TouchableOpacity style={styles.button} onPress={this.addNum}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.reduceNum}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { paddingLeft: 24, paddingRight: 10 }]}
              onPress={() => this.addCart(value)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>



          <Animated.View
            style={[styles.cart2, { transform: [{ scale: bounceValue }] }]}>
            <TouchableOpacity onPress={this.goCartPage}>
              <Image
                source={require('../../img/cart2.png')}
                style={{ height: 45, width: 45 }}
              />
            </TouchableOpacity>
          </Animated.View>

          {}
          {count === 0 ? null : (
            <View style={styles.circle}>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.fontColor
                }}>
                {count}
              </Text>
            </View>
          )}
          <View style={styles.message}>
            <Text>In stock</Text>
            <Text style={{ fontSize: 18, paddingTop: 5 }}>{name}</Text>
            <Text style={{ fontSize: 16, paddingTop: 5, paddingBottom: 10 }}>
              $ {price}
            </Text>
          </View>
        </View>

        <View style={styles.bottomWrapper}>
          <MessageView />
        </View>

        <Toast
          ref={this.toastRef}
          position="center"
          positionValue={0}
          fadeInDuration={650}
          fadeOutDuration={600}
          opacity={0.8}
        />
      </ScrollView>
    );
  }
}

ItemDetail.wrappedComponent.propTypes = {
  rootStore: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  topWrapper: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  bottomWrapper: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff'
  },
  imgWrapper: {
    marginTop: 30,
    alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  chooseLine: {
    marginTop: 60,
    height: 65,
    backgroundColor: theme.color,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  number: {
    fontSize: 16,
    color: theme.fontColor,
    marginLeft: 35,
    marginRight: 10
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonText: {
    fontSize: 16,
    color: theme.fontColor
  },
  cart2: {
    height: 45,
    width: 45,
    position: 'absolute',
    top: 20,
    right: 30
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: theme.color,
    position: 'absolute',
    top: 18,
    right: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cart1: {
    height: 30,
    width: 30
  },
  message: {
    paddingTop: 20,
    alignItems: 'center'
  }
});
