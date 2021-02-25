import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { width } from '../../common/screen';
import Navigator from './Navigator';
import RecomView from './recomView';
import HomeSwiper from './HomeSwiper';

import datas from '../../mock/datas';

import randomArray from '../../common/disturbArray';

const imageSources = [
    require('../../img/i1.jpg'),
    require('../../img/i2.jpg'),
    require('../../img/i3.jpg')
];

const Home = ({navigation}) => {
    const data = randomArray(datas.data);
    return (
        <ScrollView style={styles.container}>
            <View style = {styles.swiper}>
                <HomeSwiper imageSources={imageSources} />
            </View>
            <Navigator name = "Hot products" />
            <RecomView itemDatas = {data} navigation={navigation} />
        </ScrollView>
    );
};

Home.prototypes = {
    navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
      swiper: {
        width,
        height: 200
      },
      image: {
        width,
        height: 250,
        resizeMode: 'stretch'
      },
      line: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
      }
});

export default Home;