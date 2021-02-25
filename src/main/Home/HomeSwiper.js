import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import theme from '../../common/theme';
import { width } from '../../common/screen';

const HomeSwiper = ({ imageSources}) => (
    <Swiper autoplay activeDotColor={theme.color} dotColor="#ffffff">
        {
            imageSources.map((v,i) => (
                <View key={i} style={StyleSheet.imgWrap}>
                    <Image source={v} style={styles.img} />
                </View>
            ))
        }
    </Swiper>
);

Swiper.PropTypes = {
    imageSources: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    imgWrap: {
        flex: 1
    },
    img: {
        width,
        height: 250,
        resizeMode:'stretch'
    }
});

export default HomeSwiper;