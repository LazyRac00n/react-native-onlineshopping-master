import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../common/theme';

const Navigator = ({name, textStyle, barStyle}) => (
    <View style = {[styles.barStyle, barStyle]}>
        <Text style = {[styles.textStyle, textStyle]}>{name}</Text>
    </View>
);

Navigator.defaultProps = {
    name: PropTypes.string.isRequired,
    textStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    barStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

const styles = StyleSheet.create({
    barStyle: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        color: theme.color
    }
        
    
});

export default Navigator;