import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RecomProduct from './recomProduct';
import { width } from '../../common/screen';

const recomView = ({itemDatas, navigation}) => (
    <View style={styles.container}>
        {itemDatas.map((value, index) => (
            <RecomProduct
                onPress={() => navigation.navigate('ItemDetail', {value})}
                name={value.name}
                price={value.price}
                image={value.image}
                key={`list-${index}`}
                />
        ))}
    </View>
);

recomView.prototypes = {
    itemDatas: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    item: {
      width: (width - 40) / 2,
      height: 150,
      flexDirection: 'column',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom: 10,
      alignItems: 'center',
      backgroundColor: '#f5f6f5',
      borderRadius: 20
    },
    image: {
      width: 100,
      height: 100
    }
});

export default recomView;