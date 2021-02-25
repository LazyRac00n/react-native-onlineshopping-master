import React from 'react';
import { View, StyleSheet } from 'react-native';
import Line from './Line';
const Order = props => (
  /* eslint-disable-next-line */
  <View style={[styles.container, props.style]}>
    <Line
      onPress={() => goOrderScreen(props)}
      title="Orders"
      subtitle=""
    />
    <Line title="About" subtitle="version: 1.0" />
  </View>
);

const goOrderScreen = props => {
  props.navigation.navigate('OrderScreen');
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  img: {
    height: 40,
    width: 40
  }
});

export default Order;
